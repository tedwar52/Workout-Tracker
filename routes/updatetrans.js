//----------------INDEXEDDB---------------------------

//---*may be make these custom methods for schemas*---
//open request with db
const request = indexedDB.open("workout", 1);

request.onupgradeneeded = function(event) {
    //create object store called "visit" in db
    const db = event.target.result;
    const visitStore = db.createObjectStore("visit", { keyPath: "listID" });
    //instead of keypath: { autoIncrement: true }
    visitStore.createIndex("visitIndex", "day");
};

function saveVisit(record) {
    //create transaction on visit db
    const transaction = db.transaction(["visit"], "readwrite");
    //access visit object store
    const store = transaction.objectStore("visit");
    //add record to store with add method
    store.add(record);
}

function checkDatabase() {
    //open transaction on visit db
    const transaction = db.transaction(["visit"], "readwrite");
    //access visit object store
    const store = transaction.objectStore("visit");
    //get all records from store and set toa  variable
    const getAll = store.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch("/api/complete", {
                method: "POST",
                body: JSON.stringify(getAll.result)
                /*headers: {
                    Accept: text/plain,
                    "Content-Type": "application/json"
                } */
            })
            .then(response => response.json())

        }
    };
}