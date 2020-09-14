const {Router} = require('express');
const router = Router();
const pool = require('../db');
const { query } = require('../db');


router.get('/', (request, response, next) => {

    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
        if(err) return next(err)
        console.log(res.rows);
        response.json(res.rows);
    });
    
});

router.get('/:id', (request, response, next) => {
    const {id} = request.params
    pool.query(`SELECT * FROM monsters WHERE id=${id}`, (err, res) => {
        if(err) return next(err)
        response.json(res.rows)
    });
});

router.post('/', (request, response, next) => {
    const {name, personality} = request.body
    console.log(request.body)
    pool.query(`INSERT INTO monsters(name,personality) VALUES($1, $2)`,[name, personality], (err, res) => {
        if(err) return next(err)
        response.redirect('/monsters');
    });
});

router.put('/:id', (request, response, next) => {
    const {id} = request.params; 
    const keys = ["name", "personality"]
    const fields = [];
    
        keys.forEach(key => {
            if(request.body[key]) fields.push(key); 
        });
        // let counter = 0;
        // console.log("fields: ", fields, "body: ", request.body)
        // pool.query(
        //     'UPDATE monsters SET name=($1), personality=($2) WHERE id=($3)',
        //     ["Melissa","Mendez", 1],
        //     (err, res) => {
        //         //             // console.log("res: ", res)
        //         //             counter ++;
        //          if(err) return next(err);
        //         //  response.json(res.rows)
        //         // response.json(request.body)
        //         response.redirect('/monsters/1')
        //     }
        // )
        fields.forEach( (field, index) => {
            pool.query(
                `UPDATE monsters SET ${field}=($1) WHERE id=($2)`,
                [request.body[field], id],
                (err, res) => {
                    // console.log("res: ", res)
                    // counter ++;
                    if(err) return next(err);
                    
                    // console.log(`${counter}-time`)
                    if(index === fields.length - 1) {
                   
                        response.redirect('/monsters/1');
                        // response.json(request.body);
                    }
                    //response.json(request.body)
                    //response.redirect('/monsters')
                    //response.redirect('/')
                }
            )
        });
        // response.redirect('/monsters');
        
        // pool.query(
        //     'SELECT * FROM monsters ',
        //     [id],
        //     (err, res) => {
        //         if(err) return next(err);
        //         response.json(res.rows)
        //     }
        // )
        
});

router.delete('/:id', (request, response, next) => {
    const {id} = request.params
    console.log(id)
    pool.query(
        'DELETE FROM monsters WHERE id=($1)',
        [id],
        (err, res) => {
            if(err) return next(err)

            response.redirect('/monsters')
        }
    )
})

module.exports = router