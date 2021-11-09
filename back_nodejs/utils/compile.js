const request = require('request');

module.exports = (data)=>{
    const {source, input_data, language} = data;

    // compile request data to jdoodle
    const compile_data = {
        script : source,
        stdin : input_data,
        language : language,
        versionIndex: "0",
        clientId : process.env.JDOODLE_ID,
        clientSecret : process.env.JDOODLE_SECRET
    };

    // send compile request to jdoodle
    const req = new Promise((resolve, reject)=>{
        request({
            url: 'https://api.jdoodle.com/v1/execute',
            method: "POST",
            json: compile_data
        }, (err, resp, body)=>{
            console.log('err : ', err);
            console.log('body : ', body);
    
            if(err) reject(err);
            else resolve(body);
        })
    })

    return req;
}