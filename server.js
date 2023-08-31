const express=require('express')
const app=express()
const pool=require("./dbConfig")
const bcrypt=require('bcrypt')

const users=[]

app.use(express.static(__dirname));

app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get ('/',(req,res)=> {
    res.render('index.ejs',{name : 'Dhwani'})
})

app.get('/session',(req,res)=>{
    res.render('session.ejs')
})


app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.post('/login',(req,res)=>{

})

app.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

app.post('/signup',(req,res)=>{
    try{
        const hashedPassword=bcrypt.hash(req.body.password,10)
        users.push({
            id: Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
        pool.query(
            `select * from users 
            Where email=$1`,
            [email],
            (err,results) => {
                if(err){
                    throw err;
                }
                console.lof(results.row);

                if(results.rows.length>0){
                    errors.push({message:"Email aldready registered"});
                    res.render("register",{errors});
                }
                else{
                    pool.query(
                        `INSERT into users (name,email,password)
                        values($1,$2,$3)
                        returning id,password`,[name,email,hashedPassword],
                        (err,results)=>{
                            if(err){
                                throw err;
                            }
                            console.log(results.rows);
                            res.redirect("/profile_client");
                        }
                    )
                }

            }
           
        )
        res.redirect('/profile_client')
    }catch{
        res.redirect('/signup')
    }
    console.log(users)

})


app.get('/psychologist',(req,res)=>{
    res.render('psychologist.ejs')
})



app.get('/About',(req,res)=>{
    res.render('About.ejs')
})

app.get('/Blogs',(req,res)=>{
    res.render('Blogs.ejs')
})

app.get('/profile_client',(req,res)=>{
    res.render('Profile_client.ejs')
})

app.get('/session_set',(req,res)=>{
    res.render('session_set.ejs')
})

app.get('/view_psychologist',(req,res)=>{
    res.render('view_psychologist.ejs')
})


app.listen(3000)