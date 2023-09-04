// Database

var mysql = require('./dbcon.js');


// Setup

const express = require('express');
const { append } = require('express/lib/response');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('mysql', mysql);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes

app.get("/", (req, res) => {
    res.render('pages/index');
});


// Users: READ, CREATE, UPDATE, DELETE, SEARCH

app.get("/users", (req, res) => {
    let usersQuery = "SELECT * FROM Users ORDER BY userID ASC;";   
    
    mysql.pool.query(usersQuery, (err, result) => {
            if (err)
                throw err;
            else {
                res.render('users.ejs', { users: result });
            }
        })
    });

app.post("/users/add", (req, res) => {
    userAddQuery = `INSERT INTO Users SET ?`;
    const userDetails = req.body;

    mysql.pool.query(userAddQuery, userDetails, (err, result, fields) => {
        if (err) throw err;
         console.log("User data inserted successfully ");
        });
    res.redirect("/users")
    });

app.post("/users/add", (req,res) => {
        res.status(404);
        res.render('404');
    });

app.post("/users/update", (req, res) => {
    let data = req.body;
    // Account for NULL values
    let userID = data['input-userID'];
    let userName = data['input-userName'];
    let userAge = data['input-userAge'];
    let userEmail = data['input-userEmail'];

    if (userName !== ''){
    query1 = `UPDATE Users SET userName = '${userName}' WHERE userID = ${userID}`;
    mysql.pool.query(query1, userID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    if (userAge !== ''){
    query2 = `UPDATE Users SET userAge = '${userAge}' WHERE userID = ${userID}`;
    mysql.pool.query(query2, userID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    if (userEmail !== ''){
    query3 = `UPDATE Users SET userEmail = '${userEmail}' WHERE userID = ${userID}`;
    mysql.pool.query(query3, userID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    res.redirect('/users')
});

app.post("/users/delete", (req, res) => {
    userDeleteQuery = `DELETE FROM Users WHERE userID = ?`;
    const userIDDetail = req.body.userID;
    console.log(req.body)

    mysql.pool.query(userDeleteQuery, userIDDetail, (err, result, fields) => {
        if (err) throw err;
         console.log("User data deleted successfully ");
        });
    res.redirect("/users")
    });

app.post("/users/search", (req, res) => {
    let data = req.body;
    let searchQuery = `SELECT * FROM Users WHERE userID = '${data['input-userID']}';`;
    mysql.pool.query(searchQuery, (err, result) => {
            if (err)
                throw err;
            else {
                res.render('users.ejs', { users: result });
            }
        })
    });      

app.post("/users/reset", (req, res) => {
    let query1 = `SELECT * FROM Users;`;
    mysql.pool.query(query1, (err, result) => {
        if (err)
            throw err;
        else {
            res.render('users.ejs', { users: result });
        }
    })
});


// Records: READ, CREATE, UPDATE, DELETE

app.get("/records", (req, res) => {
    let recordsQuery = "SELECT * FROM Records ORDER BY recordID ASC;";   
    
    mysql.pool.query(recordsQuery, (err, result) => {
            if (err)
                throw err;
            else {
                res.render('records.ejs', { records: result });
            }
        }) 
    });

app.post("/records/add", (req, res) => {
    recordAddQuery = `INSERT INTO Records SET ?`;
    const recordDetails = req.body;

    mysql.pool.query(recordAddQuery, recordDetails, (err, result, fields) => {
        if (err) throw err;
         console.log("Record data inserted successfully ");
        });
    res.redirect("/records")
    });

app.post("/records/update", (req, res) => {
    let data = req.body;
    // Account for NULL values
    let recordID = data['input-recordID'];
    let userID = data['input-userID'];
    let recordDate = data['input-recordDate'];
    let recordNotes = data['input-recordNotes'];

    if (userID !== ''){
    query1 = `UPDATE Records SET userID = '${userID}' WHERE recordID = ${recordID}`;
    mysql.pool.query(query1, recordID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    if (recordDate !== ''){
    query2 = `UPDATE Records SET recordDate = '${recordDate}' WHERE userID = ${recordID}`;
    mysql.pool.query(query2, recordID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    if (recordNotes !== ''){
    query3 = `UPDATE Records SET recordNotes = '${recordNotes}' WHERE userID = ${recordID}`;
    mysql.pool.query(query3, recordID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    res.redirect('/records')
});

app.post("/records/delete", (req, res) => {
    recordDeleteQuery = `DELETE FROM Records WHERE recordID = ?`;
    const recordIDDetail = req.body.recordID;
    console.log(req.body)

    mysql.pool.query(recordDeleteQuery, recordIDDetail, (err, result, fields) => {
        if (err) throw err;
         console.log("Record data deleted successfully");
        });
    res.redirect("/records")
    });


// Injuries: READ, CREATE, UPDATE, DELETE

app.get("/injuries", (req, res) => {
    let injuriesQuery = "SELECT * FROM Injuries ORDER BY injuryID ASC;";   
    
    mysql.pool.query(injuriesQuery, (err, result) => {
            if (err)
                throw err;
            else {
                res.render('injuries.ejs', { injuries: result });
            }
        }) 
    });

app.post("/injuries/add", (req, res) => {
    injurydAddQuery = `INSERT INTO Injuries SET ?`;
    const injuryDetails = req.body;

    mysql.pool.query(injurydAddQuery, injuryDetails, (err, result, fields) => {
        if (err) throw err;
         console.log("Injury data inserted successfully ");
        });
    res.redirect("/injuries")
    });

app.post("/injuries/update", (req, res) => {
    let data = req.body;
    // Account for NULL values
    let injuryID = data['input-injuryID'];
    let injuryName = data['input-injuryName'];
    let injuryGuide = data['input-injuryGuide'];
    let subpartID = data['input-subpartID'];

    if (injuryName !== ''){
    query2 = `UPDATE Injuries SET injuryName = '${injuryName}' WHERE injuryID = ${injuryID}`;
    mysql.pool.query(query2, injuryID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    if (injuryGuide !== ''){
    query3 = `UPDATE Injuries SET injuryGuide = '${injuryGuide}' WHERE injuryID = ${injuryID}`;
    mysql.pool.query(query3, injuryID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    if (subpartID !== ''){
    query3 = `UPDATE Injuries SET subpartID = '${subpartID}' WHERE injuryID = ${injuryID}`;
    mysql.pool.query(query3, injuryID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    res.redirect('/injuries')
});

app.post("/injuries/delete", (req, res) => {
    recordDeleteQuery = `DELETE FROM Injuries WHERE injuryID = ?`;
    const injuryIDDetail = req.body.injuryID;
    console.log(req.body)

    mysql.pool.query(recordDeleteQuery, injuryIDDetail, (err, result, fields) => {
        if (err) throw err;
         console.log("Injury data deleted successfully ");
        });
    res.redirect("/injuries")
    });


// Injury_Records: READ, CREATE, DELETE

app.get("/injury_records", (req, res) => {
    let injuryRecordQuery = "SELECT * FROM Injury_Record ORDER BY injuryID ASC;";   
    
    mysql.pool.query(injuryRecordQuery, (err, result) => {
            if (err)
                throw err;
            else {
                res.render('injury_records.ejs', { injury_records: result });
            }
        }) 
    });

app.post("/injury_records/add", (req, res) => {
    injuryRecordQuery = `INSERT INTO Injury_Record SET ?`;
    const injuryRecordDetails = req.body;

    mysql.pool.query(injuryRecordQuery, injuryRecordDetails, (err, result, fields) => {
        if (err) throw err;
         console.log("Injury_Record data inserted successfully");
        });
    res.redirect("/injury_records")
    });

app.post("/injury_records/delete", (req, res) => {
    injury_recordDeleteQuery = `DELETE FROM Injury_Record WHERE recordID = ?`;
    const recordIDDetail = req.body.recordID;
    console.log(req.body)

    mysql.pool.query(injury_recordDeleteQuery, recordIDDetail, (err, result, fields) => {
        if (err) throw err;
         console.log("Injury_Record data deleted successfully");
        });
    res.redirect("/injury_records")
    });


// BodyParts: READ, CREATE, UPDATE, DELETE

app.get("/bodyparts", (req, res) => {
    let bodyPartsQuery = "SELECT * FROM BodyParts ORDER BY bodypartID ASC;";   
    
    mysql.pool.query(bodyPartsQuery, (err, result) => {
            if (err)
                throw err;
            else {
                res.render('bodyparts.ejs', { bodyParts: result });
            }
        }) 
    });

app.post("/bodyparts/add", (req, res) => {
    bodypartAddQuery = `INSERT INTO BodyParts SET ?`;
    const bodypartDetails = req.body;

    mysql.pool.query(bodypartAddQuery, bodypartDetails, (err, result, fields) => {
        if (err) throw err;
         console.log("BodyPart data inserted successfully ");
        });
    res.redirect("/bodyparts")
    });

app.post("/bodyparts/update", (req, res) => {
    let data = req.body;
    // Account for NULL values
    let bodypartID = data['input-bodypartID'];
    let bodypartName = data['input-bodypartName'];

    if (bodypartName !== ''){
    query2 = `UPDATE BodyParts SET bodypartName = '${bodypartName}' WHERE bodypartID = ${bodypartID}`;
    mysql.pool.query(query2, bodypartID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    res.redirect('/bodyparts')
});

app.post("/bodyparts/delete", (req, res) => {
    bodypartDeleteQuery = `DELETE FROM BodyParts WHERE bodyPartID = ?`;
    const bodypartIDDetail = req.body.bodyPartID;
    console.log(req.body)

    mysql.pool.query(bodypartDeleteQuery, bodypartIDDetail, (err, result, fields) => {
        if (err) throw err;
         console.log("Bodypart data deleted successfully ");
        });
    res.redirect("/bodyparts")
    });


// SubParts: READ, CREATE, UPDATE, DELETE, FILTER

app.get("/subparts", (req, res) => {
    let subPartsQuery = "SELECT * FROM SubParts ORDER BY subpartID ASC;";   
    
    mysql.pool.query(subPartsQuery, (err, result) => {
            if (err)
                throw err;
            else {
                res.render('subparts.ejs', { subParts: result });
            }
        }) 
    });

app.post("/subparts/add", (req, res) => {
    subpartAddQuery = `INSERT INTO SubParts SET ?`;
    const subpartDetails = req.body;

    mysql.pool.query(subpartAddQuery, subpartDetails, (err, result, fields) => {
        if (err) throw err;
         console.log("SubPart data inserted successfully ");
        });
    res.redirect("/subparts")
    });

app.post("/subparts/update", (req, res) => {
    let data = req.body;
    // Account for NULL values
    let subpartID = data['input-subpartID'];
    let subpartName = data['input-subpartName'];
    let bodypartID = data['input-bodypartID'];

    if (subpartName !== ''){
    query2 = `UPDATE SubParts SET subpartName = '${subpartName}' WHERE subpartID = ${subpartID}`;
    mysql.pool.query(query2, subpartID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    if (bodypartID !== ''){
    query3 = `UPDATE SubParts SET bodypartID = '${bodypartID}' WHERE subpartID = ${subpartID}`;
    mysql.pool.query(query3, subpartID, (error, rows, fields) => {
        if (error){
            console.log(error)
            res.sendStatus(400);
            }
        })
    }
    res.redirect('/subparts')
});

app.post("/subparts/delete", (req, res) => {
    subpartDeleteQuery = `DELETE FROM SubParts WHERE subpartID = ?`;
    const subpartIDDetail = req.body.subpartID;
    console.log(req.body)

    mysql.pool.query(subpartDeleteQuery, subpartIDDetail, (err, result, fields) => {
        if (err) throw err;
         console.log("SubPart data deleted successfully ");
        });
    res.redirect("/subparts")
    });

app.post("/subparts/filter", (req, res) => {
    let data = req.body;
    let query1 = `SELECT * FROM SubParts WHERE bodypartID = '${data['input-bodypartID']}';`;
    mysql.pool.query(query1, (err, result) => {
            if (err)
                throw err;
            else {
                res.render('subparts.ejs', { subParts: result });
            }
        })
    });    

app.post("/subparts/reset", (req, res) => {
    let query1 = `SELECT * FROM SubParts;`;
    mysql.pool.query(query1, (err, result) => {
        if (err)
            throw err;
        else {
            res.render('subparts.ejs', { subParts: result });
        }
    })
});

// Listener

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));