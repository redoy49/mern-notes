01. What is MongoDB and how does it differ from traditional relational databases?
Ans: MongoDB is a NoSQL database, which means it does not use the traditional RDBMS structure. Instead, it uses a flexible, document-oriented data model that stores data as JSON-like documents in a format called BSON (Binary JSON). It organizes data into documents and collections rather than rows and tables.

02. Explain the BSON storage format.
Ans: BSON stands for Binary JavaScript Object Notation. JSON is text-based and human-readable, while BSON is binary and machine-readable. It stores serialized JSON documents in a binary-encoded format and extends JSON capabilities by supporting additional data types like Date, ObjectId, and regular expressions. A BSON document typically contains three components: the size of the document, field elements (such as data type, name, and value), and a null terminator — all encoded in binary format.

03. Describe the Structure of a MongoDB Document.
Ans: A MongoDB document is a collection of key-value pairs stored in BSON format. Each key is a string that identifies the field, and each value can be of various data types, such as strings, numbers, arrays, embedded documents, dates, or ObjectIds. Documents can also contain nested documents, allowing for hierarchical data structures. Every document has an _id field that uniquely identifies it within a collection.

04. What is a Collection and Database in MongoDB?
Ans: Database: A MongoDB database is a container for collections. Each database has its own set of files on the file system and provides a namespace for organizing data. A single MongoDB server can host multiple databases.

Collection: A collection is a group of MongoDB documents within a database. It is similar to a table in relational databases but without a fixed schema. Collections store documents in BSON format, and documents within the same collection can have different fields or structures.

05. What is a replica set in MongoDB?
Ans: A replica set in MongoDB is a group of instances that maintain the same dataset. They are deployed in applications that require high availability because if one instance troubles, the system automatically shifts to the next available node in the replica set. 

06. What is sharding in MongoDB?
Ans: Sharding enables horizontal scaling in MongoDB. When a single instance can't manage a large dataset, MongoDB splits the data into smaller chunks and distributes them across multiple servers or cluster, known as shards. 

07. What is the differences between replication and sharding?
Ans: Feature	Replication	Sharding
Purpose	Ensures high availability by keeping copies of data	Provides scalability for large datasets by splitting data across servers
Implementation	Uses replica sets with a primary and secondary nodes	Uses shards to partition data across multiple servers
Use Case	Provides fault tolerance and disaster recovery	Balances load and improves performance for large databases
Data Distribution	All nodes store the same complete dataset	Each shard stores only a subset of the dataset

08. What is the difference between find() and findOne()?
Ans: The find() method returns a cursor to multiple documents that match the query criteria. This works by iterating over all the results and fetching the matching documents. On the other hand, the findOne() method returns the first matched document. It returns a single document, not a cursor.

09. What is the _id field in MongoDB?
Ans: Each document stored in a collection requires a unique identifier. This _id field acts as a primary key to uniquely identify documents in a collection. 

10. What is a capped collection in MongoDB? 
Ans: A capped collection has a fixed size and a limit for the number of documents. When the limit is reached, it automatically overwrites the oldest document and stores the latest information. This concept makes it suitable for use cases like logging and caching. 

11. Does MongoDB feature backup and recovery?
Ans: MongoDB allows data backup through the mongodump/Mongorestore utility. This tool creates binary backups of your data, which you can import whenever you need to. Another option is to use third-party cloud solutions or MongoDB Atlas(cloud service) to automate the backup process. 

MongoDB provides the mongorestore utility to import data from backed-up BSON files. Additionally, third-party cloud solutions offer automated restoration capabilities, minimizing downtime. 

12. How to create an index in MongoDB?
Ans: MongoDB has a createIndex() function to create various types of indexes, such as single-field indexes, text indexes, and 2D indexes. The method has two input parameters: keys defining the columns to index and other options.

Syntax: db.collection.createIndex(keys, options)
- Keys: { field1: 1, field2: -1, ... }, 1 for ascending order and -1 for descending order
- Options: {unique: true}, {sparse: true}, { expireAfterSeconds: 3600 }

13. How to query a document in MongoDB?
Ans: In MongoDB, you can query documents using the find() method. To query all documents in a collection, use db.collection_name.find(). The find method has two input parameters: query and projection. The query parameter is used to filter documents that match a specific condition. 
Syntax: db.collection_name.find({condition}) 

The second is a projection parameter that indicates the columns to include or exclude in the output. Assign 1 to the columns that you want to fetch. Here is the syntax:
db.collection_name.find({},{column1: 1, column2: 1})

14. How does MongoDB ensure high availability?
Ans: MongoDB achieves high availability through replication. Replica sets store different copies of data across nodes so that if one node fails, another can take over.

15. Explain the concept of aggregation in MongoDB.
Ans: MongoDB aggregates data from multiple documents and processes it to return a single result. This involves an aggregation pipeline, where documents pass through several stages—each stage’s output becomes the input for the next. A typical pipeline might include stages like match, group, and sort:

- Match: filter documents based on a condition.
- Group: Groups the data and performs aggregation operation.
- Sort: Sorts the final results the way we need.

db.products.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: "$product_id", totalAmount: { $sum: "$amount" },
  { $sort
]);

16. How to Handle Transactions in MongoDB?
Ans: MongoDB supports multi-document ACID transactions by allowing us to perform a series of read and write operations across multiple documents and collections in a transaction. This ensures data consistency and integrity. To use transactions we typically start a session, begin a transaction, perform the operations and then commit or abort the transaction.

17. What is map-reduce in Mongodb?
Ans: Map-reduce is a data processing paradigm that performs operations on large datasets and outputs aggregated results. MongoDB offers a built-in mapReduce() function consisting of two stages: map and reduce. 

During the map phase, the function processes each document in the collection and generates key-value pairs. These key-value pairs are aggregated in the reduce phase, and operations are performed. 

For example, if you have a collection of text documents, the map function would convert each word into a key and assign a value of 1 to it. The reduce function then sums the values of each key to count the occurrences of each word across the entire collection.

18. 4. What are TTL Indexes, and How are They Used in MongoDB?
Ans: TTL (Time To Live) Indexes in MongoDB are special indexes that automatically remove documents from a collection after a certain period. They are commonly used for data that needs to expire after a specific time, such as session information, logs, or temporary data. To create a TTL index, you can specify the expiration time in seconds

Example: Remove documents 1 hour after createdAt:
db.sessions.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 3600 })

19. How can you optimize MongoDB queries?
Here are a few solutions that can be applied to optimize your MongoDB queries:

Indexes store information about documents, which helps to locate the right data quickly. So, creating indexes can improve query performance.
If you know which columns you need, use projection methods to return only those fields for better performance.
Avoid expensive operations like regular expressions; use prefix searches or indexed fields instead.
Choose the right shard key,  especially when working on read-heavy workloads.

20. How can you optimize MongoDB queries?
Ans: Here are a few solutions that can be applied to optimize your MongoDB queries:

Indexes store information about documents, which helps to locate the right data quickly. So, creating indexes can improve query performance.
If you know which columns you need, use projection methods to return only those fields for better performance.
Avoid expensive operations like regular expressions; use prefix searches or indexed fields instead.
Choose the right shard key,  especially when working on read-heavy workloads.

21. What challenges might you face while migrating from RDBMS to MongoDB?
Ans: Mapping relational database operations to their counterparts in NoSQL can be challenging.

Data Modeling Differences: RDBMS uses structured tables with fixed schemas, while MongoDB is schema-less and document-oriented. Existing relational models often need to be redesigned for optimal MongoDB performance.
For instance, SQL joins are not straightforward in MongoDB; instead, you need to use the aggregation framework to achieve similar functionality. The $lookup operator is the equivalent of JOIN.
Another challenge is the data stored in structured tables will need transformation to fit into MongoDB’s BSON storage format. 
Additionally, while RDBMS provides robust ACID compliance, MongoDB only offers document-level ACID properties, which means complex ACID transactions may require extra attention.

22. How to Create a New Database and Collection in MongoDB?
Ans: To create a new database and collection in MongoDB, you can use the mongo shell:

use mydatabase
db.createCollection("mycollection")
This command switches to mydatabase (creating it if it doesn't exist) and creates a new collection named mycollection.

23. Explain the Basic Syntax of MongoDB CRUD Operations.
Ans: CRUD operations in MongoDB are used to create, read, update, and delete documents.

Create: db.collection.insertOne({ name: "Alice", age: 25 })
Read: db.collection.find({ name: "Alice" })
Update: db.collection.updateOne({ name: "Alice" }, { $set: { age: 26 } })
Delete: db.collection.deleteOne({ name: "Alice" })

24. Describe the Aggregation Framework in MongoDB
Ans: The Aggregation Framework in MongoDB is a powerful tool for performing data processing and transformation on documents within a collection.
It works by passing documents through a multi-stage pipeline, where each stage performs a specific operation on the data, such as filtering, grouping, sorting, reshaping and computing aggregations.
This framework is particularly useful for creating complex data transformations and analytics directly within the database.

25. How to Handle Schema Design and Data Modeling in MongoDB?
Ans: Schema design and data modeling in MongoDB involve defining how data is organized and stored in a document-oriented database. Unlike SQL databases, MongoDB offers flexible schema design, which can be both an advantage and a challenge. Key considerations for schema design include:

Embedding vs. Referencing: Deciding whether to embed related data within a single document or use references between documents.
Document Structure: Designing documents that align with application query patterns for efficient read and write operations.
Indexing: Creating indexes to support query performance.
Data Duplication: Accepting some level of data duplication to optimize for read performance.
Sharding: Designing the schema to support sharding if horizontal scaling is required.

26. How to Implement Access Control and User Authentication in MongoDB?
Ans: Access control and user authentication in MongoDB are implemented through a role-based access control (RBAC) system. You create users and assign roles that define their permissions. To set up access control:

Enable Authentication: Configure MongoDB to require authentication by starting the server with --auth or setting security.authorization to enabled in the configuration file.
Create Users: Use the db.createUser method to create users with specific roles.
db.createUser({
  user: "admin",
  pwd: "password",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
});
Assign Roles: Assign roles to users that define their permissions, such as read, write, or admin roles for specific databases or collections.

27. Explain the Concept of Geospatial Indexes in MongoDB
Ans: Geospatial indexes in MongoDB are special indexes that support querying of geospatial data, such as locations and coordinates. They enable efficient queries for proximity, intersections, and other spatial relationships. MongoDB supports two types of geospatial indexes: 2d for flat geometries and 2dsphere for spherical geometries.

Example of creating a 2dsphere index:
db.places.createIndex({ location: "2dsphere" });

28. What are Change Streams in MongoDB, and How are They Used?
Ans: Change Streams in MongoDB allow applications to listen for real-time changes to data in collections, databases, or entire clusters. They provide a powerful way to implement event-driven architectures by capturing insert, update, replace, and delete operations. To use Change Streams, you typically open a change stream cursor and process the change events as they occur.

Example:

const changeStream = db.collection('orders').watch();
changeStream.on('change', (change) => {
  console.log(change);
});

29. How to Implement Full-Text Search in MongoDB?
Ans: Full-Text Search in MongoDB is implemented using text indexes. These indexes allow you to perform text search queries on string content within documents.

Example:

db.collection.createIndex({ content: "text" });
db.collection.find({ $text: { $search: "mongodb" } });

In this example, a text index is created on the content field, and a text search query is performed to find documents containing the word "mongodb."

30. What are the Considerations for Deploying MongoDB in a Production Environment?
Ans: Considerations for deploying MongoDB in a production environment include:

Replication: Set up replica sets for high availability and data redundancy.
Sharding: Implement sharding for horizontal scaling and to distribute the load.
Backup and Recovery: Establish a robust backup and recovery strategy.
Security: Implement authentication, authorization, and encryption.
Monitoring: Use monitoring tools to track performance and detect issues.
Capacity Planning: Plan for adequate storage, memory, and CPU resources.
Maintenance: Regularly update MongoDB to the latest stable version and perform routine maintenance tasks.

31. Explain the Concept of Horizontal Scalability and Its Implementation in MongoDB
Ans: Horizontal Scalability in MongoDB refers to the ability to add more servers to distribute the load and data. This is achieved through sharding, where data is partitioned across multiple shards.
Each shard is a replica set that holds a subset of the data. Sharding allows MongoDB to handle large datasets and high-throughput operations by distributing the workload.

32. Describe the Process of Migrating Data from a Relational Database to MongoDB
Migrating data from a relational database to MongoDB involves several steps:

Schema Design: Redesign the relational schema to fit MongoDB's document-oriented model. Decide on embedding vs. referencing, and plan for indexes and collections.
Data Export: Export data from the relational database in a format suitable for MongoDB (e.g., CSV, JSON).
Data Transformation: Transform the data to match the MongoDB schema. This can involve converting data types, restructuring documents, and handling relationships.
Data Import: Import the transformed data into MongoDB using tools like mongoimport or custom scripts.
Validation: Validate the imported data to ensure consistency and completeness.
Application Changes: Update the application code to interact with MongoDB instead of the relational database.
Testing: Thoroughly test the application and the database to ensure everything works as expected.
Go Live: Deploy the MongoDB database in production and monitor the transition.

Sources: https://www.datacamp.com/blog/mongodb-interview-questions
Sources: https://www.geeksforgeeks.org/mongodb/mongodb-interview-questions/
Sources: https://www.interviewbit.com/mongodb-interview-questions/#mongodb-indexing