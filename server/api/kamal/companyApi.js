const Constants = require('../../utils/constants');
const MySqlHandler = require('../../utils/mySqlHandler');
const C = new Constants();
const mySql = new MySqlHandler();


const companyApi = class {
    constructor() {
    }

    getCompany = async (param) => {
        var query = 'SELECT * FROM company';
        var values = [];
        var clause = {};
        if ('id' in param) {
            clause['id'] = param.id;
        }
        if ('headquarters' in param) {
            clause['headquarters'] = param.headquarters;
        }
        if ('name' in param) {
            clause['name'] = param.name;
        }

        if (Object.keys(clause).length != 0) {
            query += ' WHERE'
            for (var key in clause) {
                query += ` ${key} = ? AND`;
                values.push(clause[key]);
            }
            var n = query.lastIndexOf(' AND');
            query = query.slice(0, n) + query.slice(n).replace(' AND', '');
        }

        return new Promise(function (resolve, reject) {
            mySql.db.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    addProject = async (projectObj) => {
        const [uu_id, project_id, collection_name, collection_details, element_details] = [projectObj.uuId, projectObj.projectId, projectObj.collectionName, projectObj.collectionDetails, projectObj.elementDetails];

        await mySql.db.query(
            "INSERT INTO user_projects (uu_id, project_id, collection_name, collection_details, element_details) VALUES (?,?,?,?,?)",
            [uu_id, project_id, collection_name, collection_details, element_details],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Values inserted");
                }
            }
        );
        // mySql.db.end();
    }

    updateProject = async (projectObj) => {
        var arr = [];
        var query = "";

        if ('collectionData' in projectObj && 'elementData' in projectObj) {
            query = "UPDATE user_projects SET collectionData=?, elementData=? WHERE projectId = ?";
            arr = [projectObj.collectionData, projectObj.elementData, projectObj.projectId];
        }
        else if ('dna' in projectObj) {
            query = "UPDATE user_projects SET dna=? WHERE project_id = ?";
            arr = [projectObj.dna, projectObj.projectId];
        }
        else if ('nftMetadata' in projectObj) {
            query = "UPDATE user_projects SET nft_metadata=? WHERE project_id = ?";
            arr = [projectObj.nftMetadata, projectObj.projectId];
        }

        if ('collectionData' in projectObj || 'elementData' in projectObj || 'dnaData' in projectObj || 'nftMetadata' in projectObj) {
            await mySql.db.query(
                query, arr, (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Values updated");
                    }
                }
            );
            // mySql.db.end();
        }
        return true;
    }

    getUserProjects = async (userId) => {
        return new Promise(function (resolve, reject) {
            mySql.db.query("SELECT * FROM user_projects WHERE uu_id =?", [userId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}


module.exports = companyApi;