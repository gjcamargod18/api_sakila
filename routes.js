const express = require('express')
const { REGEX_BACKSLASH } = require('picomatch/lib/constants')
const routes = express.Router()

routes.get('/', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        var query = "SELECT distinct f.*, c.name 'Categoria', a.*, c.*, " +
                    "concat(a.first_name,' ',a.last_name) 'Nombre completo', f.length 'Duracion', (select avg(length) from film) 'Promedio', ad.address 'Tienda' FROM film_actor fa "+
                    "INNER JOIN film f ON fa.film_id = f.film_id "+
                    "INNER JOIN actor a ON fa.actor_id = a.actor_id "+
                    "INNER JOIN film_category fc on f.film_id = fc.film_id "+
                    "INNER JOIN category c ON  fc.category_id = c.category_id "+
                    "INNER JOIN inventory i ON i.film_id = f.film_id "+
                    "INNER JOIN store s ON i.store_id = s.store_id "+
                    "INNER JOIN address ad ON s.address_id = ad.address_id "+
                    "WHERE (a.actor_id= 0 or 0 = 0 ) and (f.film_id = 1 or 0 =1 )"+
                    "ORDER BY 2"
        conn.query(query, (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT  INTO books set ?',[req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('registrado')
        })
    })
})

routes.delete('/:id', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE  FROM books WHERE id=?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('borrado')
        })
    })
})

routes.put('/:id', (req,res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE books set ? WHERE id=?',[req.body,req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('actualizado')
        })
    })
})

module.exports = routes