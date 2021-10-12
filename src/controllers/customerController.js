const controller = {};

controller.list = (req, res) => {
    req.getConnection( (err, conn) => {

        if( err ) {
            if (error) throw error;
        }

        conn.query('select * from customer', (err, customers ) => {
            if( err ) {
                res.json( err);
            }
            console.log( customers );
            res.render('customer',{
                data:customers
            });
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log( req.body );
    req.getConnection( (err, conn ) => {
        conn.query(' insert into customer set ?',[ data], (err, customer, fields ) => {
            console.log( customer.insertId);
            console.log( customer );
        })
    });
    res.redirect("/");
}

controller.delete = (req, res ) => {
    const { id } = req.params;
    console.log( req.params.id);
    req.getConnection( (err, conn ) => {
        conn.query('delete from customer where id = ?',[ id], (err, rows ) => {
            res.redirect("/");        
            
        })
    });
    
}


controller.edit = (req, res) => {
    const { id } = req.params;
    console.log( id );

    req.getConnection( (err, conn ) => {
        conn.query('select id, name, address, phone from customer where id= ?',[id], (err, customer ) => {
            if( err ) {
                res.json( err);
            } else {
                const data = customer[0];
                res.render('customer_edit',{ data });
            }            
        });
    });
}


controller.update = (req, res ) => {
    const { id } = req.params;
    const form  = JSON.parse(JSON.stringify(req.body))
    console.log( req.params.id);
    console.log( form );
    
    
    req.getConnection( (err, conn ) => {
        conn.query('update customer set ? where id = ? ',[ form, id], (err, rows ) => {
            if( err ) {
                console.log( err );
            } else {
                res.redirect("/");                    
            }
            
        })
    });
    
    //res.send("works..!");
    
}


module.exports = controller;

