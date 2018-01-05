const mongo = require("mongodb").MongoClient;
//mlab user: maaa16, password: $Qj7r5ffhl
//mlab user: magnus, password: vb8gGtlQT3
// const dsn = "mongodb://magnus:vb8gGtlQT3@ds129156.mlab.com:29156/maaa16";

/**
 * Find documents in an collection by matching search criteria.
 *
 * @async
 *
 * @param {string} dsn        DSN to connect to database.
 * @param {string} colName    Name of collection.
 * @param {object} criteria   Search criteria.
 * @param {object} projection What to project in results.
 * @param {number} limit      Limit the number of documents to retrieve.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<array>} The resultset as an array.
 */
exports.findInCollection = async function(dsn, colName, criteria, projection, limit) {
    // console.log("colName: " + colName);
    const db  = await mongo.connect(dsn);
    const col = await db.collection(colName);

    const res = await col.find(criteria, projection).limit(limit).toArray();

    await db.close();

    return res;
};


exports.insertToCollection = async function(dsn, colName, doc) {
    console.log("Database -> insertToCollection - kommer hit");
    console.log("doc.firstname: " + doc.firstname);
    console.log("colName " + colName);
    const db = await mongo.connect(dsn);

    console.log("db: " + db);

    const col = await db.collection(colName);

    await col.insert(doc);

    await db.close();
};

exports.updateSpecField = async function(dsn, colName, query, update) {
    const db = await mongo.connect(dsn);
    const col = await db.collection(colName);

    await col.update(query, {$set: update});

    await db.close();
};

exports.deleteOneFromCollection = async function(dsn, colName, filter) {
    const db = await mongo.connect(dsn);
    const col = await db.collection(colName);

    await col.deleteOne(filter);

    await db.close();
};
