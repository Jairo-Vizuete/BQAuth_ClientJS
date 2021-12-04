const user = {}
var soap = require('soap');
// var url = 'http://localhost:8090/ws/user.wsdl';
var url = 'http://34.125.102.171:8600/ws/user.wsdl';

user.login = async (req, res) => {
    var args = {
        username: req.body.username,
        password: req.body.password
    }
    soap.createClient(url, function (err, client) {
        client.login(args, function (err, result) {
            try {
                console.log("El usuario "+result.user.username+" acaba de logearse");
                console.log("Cédula: "+result.user.identifier);
                console.log("Tipo de identificación: "+result.user.identifierType);
                console.log("Email: "+result.user.email);
                console.log("Teléfono: "+result.user.phone);
                console.log("Fecha de logeo: "+result.user.createdAt);
                res.status(200).json(result)
            } catch (err) {
                console.log("El usuario no existe en la base de datos")
                console.log(err)
                res.status(400).send("El usuario no existe en la base de datos")
            }
        });
    });

}

user.createUser = async (req, res) => {
    var args = {
        userRQ:{
            identifier: req.body.identifier,
            identifierType: req.body.identifierType,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        }
    }
    soap.createClient(url, function (err, client) {
        client.createUser(args, function (err, result) {
            try {
                console.log("El usuario "+result.user.username+" ha sido creado exitosamente con los siguientes datos:")
                console.log("Cédula: "+result.user.identifier);
                console.log("Tipo de identificación: "+result.user.identifierType);
                console.log("Email: "+result.user.email);
                console.log("Teléfono: "+result.user.phone);
                console.log("Fecha de logeo: "+result.user.createdAt);
                res.status(200).json(result)
            } catch (err) {
                console.log("El usuario ya existe en la base de datos")
                res.status(400).send("El usuario ya existe en la base de datos")
            }
        });
        // console.log(client.describe());
    });
}

module.exports = user