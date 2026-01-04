# MongoDB Queries — In-Depth Notes

MongoDB is a **NoSQL document database** that stores data as BSON documents (binary JSON). Queries in MongoDB are performed on **collections** within a database. This note covers **CRUD operations, query operators, aggregation, indexing, and best practices** for production-level usage.

---

## 1. CRUD Operations

### a) Insert Documents

```js
// Insert a single document
db.books.insertOne({ title: "Book 1", author: "Buddo", pages: 200 });

// Insert multiple documents
db.books.insertMany([
  { title: "Book 2", author: "Anna", pages: 150 },
  { title: "Book 3", author: "John", pages: 300 },
]);
```

- `insertOne` inserts a single document.
- `insertMany` inserts multiple documents at once.
- In production, always validate data before insertion.

---

### b) Read Documents

```js
// Retrieve all documents
db.books.find();

// Retrieve documents with a filter
db.books.find({ author: "Buddo" });

// Retrieve a single document
db.books.findOne({ title: "Book 1" });

// Projection: return specific fields only
db.books.find({ author: "Buddo" }, { title: 1, _id: 0 });
```

- `find()` returns a cursor; `findOne()` returns a single document.
- Projection allows limiting fields returned to reduce bandwidth.

---

### c) Update Documents

```js
// Update a single document
db.books.updateOne({ title: "Book 1" }, { $set: { pages: 250 } });

// Update multiple documents
db.books.updateMany(
  { author: "John" },
  { $inc: { pages: 10 } } // increment pages
);
```

- `$set` updates specified fields.
- `$inc` increments numeric values.
- `$unset` can remove fields from documents.
- Always use filters to avoid updating unintended documents.

---

### d) Delete Documents

```js
// Delete a single document
db.books.deleteOne({ title: "Book 2" });

// Delete multiple documents
db.books.deleteMany({ author: "John" });
```

- Ensure filters are precise to avoid accidental deletion.
- In production, consider **soft deletes** (adding a `deleted` flag) instead of physical deletion.

---

## 2. Query Operators

| Operator | Description                | Example                                           |
| -------- | -------------------------- | ------------------------------------------------- |
| `$eq`    | Equal to                   | `{ pages: { $eq: 200 } }`                         |
| `$ne`    | Not equal to               | `{ pages: { $ne: 200 } }`                         |
| `$gt`    | Greater than               | `{ pages: { $gt: 150 } }`                         |
| `$gte`   | Greater than or equal      | `{ pages: { $gte: 200 } }`                        |
| `$lt`    | Less than                  | `{ pages: { $lt: 300 } }`                         |
| `$lte`   | Less than or equal         | `{ pages: { $lte: 300 } }`                        |
| `$in`    | Matches any value in array | `{ author: { $in: ["Buddo", "Anna"] } }`          |
| `$nin`   | Matches none in array      | `{ author: { $nin: ["John"] } }`                  |
| `$and`   | Logical AND                | `{ $and: [{ author: "Buddo" }, { pages: 200 }] }` |
| `$or`    | Logical OR                 | `{ $or: [{ author: "Buddo" }, { pages: 300 }] }`  |

- Operators allow **complex filtering** and are combined in queries for precise results.

---

## 3. Sorting, Limiting, and Pagination

```js
// Sort ascending by pages
db.books.find().sort({ pages: 1 });

// Sort descending
db.books.find().sort({ pages: -1 });

// Limit results
db.books.find().limit(5);

// Pagination
db.books.find().skip(10).limit(10);
```

- Always paginate queries in production to avoid large payloads.
- Sorting improves usability and performance when combined with indexes.

---

## 4. Aggregation

Aggregation pipelines allow **advanced data transformations, grouping, and calculations**.

```js
db.books.aggregate([
  { $match: { author: "Buddo" } },
  { $group: { _id: "$author", totalPages: { $sum: "$pages" } } },
  { $sort: { totalPages: -1 } },
]);
```

- `$match` filters documents.
- `$group` aggregates values by a key.
- `$sort` orders results.
- Aggregation pipelines are essential for analytics and reporting.

---

## 5. Indexing

- Indexes improve query performance on large collections.

```js
db.books.createIndex({ author: 1 }); // ascending index on author
```

- Index only fields used in frequent queries.
- Avoid unnecessary indexes that slow down writes.

---

## 6. Best Practices for Production

1. **Validate input** before insert or update.
2. **Use projections** to minimize returned data.
3. **Paginate large queries** with `skip` and `limit`.
4. **Use indexes** to optimize query performance.
5. **Consider soft deletes** to preserve historical data.
6. **Handle errors gracefully** in your application.
7. **Use aggregation pipelines** for analytics rather than fetching all documents client-side.

---

## 7. Mental Model

- MongoDB queries are **JSON-like objects** specifying filters, projections, and updates.
- Operators allow **conditional logic**, comparison, and logical combinations.
- Aggregation pipelines provide **multi-stage transformations** for complex data analysis.

---
