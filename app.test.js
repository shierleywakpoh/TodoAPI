import request from "supertest";
import app from "./app";
import db from "./config/db";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const data = { email: "demo@email.com", password: "mypassword" };

let header;

//const data = {name : 'caca',password:'caca123',email:'caca@gmail.com'}
afterAll(() => {
  db.end();
});


 describe ('Register',()=>{    
     test('sucessfully', async () => {
     const data = {name :'newUser3',email:'newUser3@gmail.com',password:'newUser3'}
     const response = await request(app).post('/api/register').send(data);
     expect(response.status).toBe(201);
     expect(response.body.message).toBe('register successfully');
     expect(response.body).toHaveProperty('token');
     });
 
     test('User already exists', async () => {
     const data = {name :'shier',email:'demo@email.com',password:'shier123'}
     const response = await request(app).post('/api/register').send(data);
     expect(response.status).toBe(409);
     expect(response.body.message).toBe('User already exists');
     });
 
     test('missing password', async () => {
     const data = {name :'shier',email:'shier@email.com'}
     const response = await request(app).post('/api/register').send(data);
     expect(response.status).toBe(400);
     expect(response.body.message).toBe('password is required');
     })
 
     test('missing name', async () => {
     const data = {name :' ',email:'shier@email.com',password:'shier123'}
     const response = await request(app).post('/api/register').send(data);
     expect(response.status).toBe(400);
     expect(response.body.message).toBe('name is required');
     
     });
     test('missing email', async () => {
     const data = {name :'shier',email:'',password:'shier123'}
     const response = await request(app).post('/api/register').send(data);
     expect(response.status).toBe(400);
     expect(response.body.message).toBe('email is required');
     
     });
 });


describe("Login", () => {
  test("succesfully", async () => {
    
    const response = await request(app).post("/api/login").send(data);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("login sucessfully");
    expect(response.body).toHaveProperty("token");
    header = response.body.token;
  });

  
    test('Invalid password', async () => {
    const data1 = {email:'demo@email.com',password:'mypassword123'}
    const response = await request(app).post('/api/login').send(data1);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid password');
    })

    test('Invalid email', async () => {
    const data1 = {email:'ademo1@email.com',password:'mypassword'}
    const response = await request(app).post('/api/login').send(data1);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Invalid email');
    })

    test('missing email', async () => {
    const isi = {password:'mypassword'}
    const response = await request(app).post('/api/login').send(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('email is required');
    });

    test('missing password', async () => {
    const isi = {email:'demo@email.com'}
    const response = await request(app).post('/api/login').send(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('password is required');
    });
     
});



describe ('create',()=>{
    
    test('succesfully', async () => {
    const isi = {title:'Breakfast',description:'nasi uduk'}
    const response = await request(app).post('/api/todos').set("authorization", `Bearer ${header}`).send(isi);
    expect(response.status).toBe(201);
    expect(response.body[0].description).toBe('nasi uduk');
    //console.log(response.body[0].description)
    });

    test('missing title', async () => {
    const isi = {description:'ayam boren9'}
    const response = await request(app).post('/api/todos').set("authorization", `Bearer ${header}`).send(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('title is required');
    });
    
    test('missing description', async () => {
    const isi = {title:'Buy ayam9',description:' '}
    const response = await request(app).post('/api/todos').set("authorization", `Bearer ${header}`).send(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('description is required');    
    });
});
 


describe('update', ()=>{
    
     test('succesfully', async () => {
     const id =  35
     const isi = {title:'Buy food',description:'buy chicken'}
     const response = await request(app).put(`/api/todos/${id}`).set("authorization", `Bearer ${header}`).send(isi);
     expect(response.status).toBe(201);
     expect(response.body.result[0].description).toBe('buy chicken');
     });
     
     test("can't find id", async () => {
     const id =  50
     const isi = {title:'Buy',description:'ayam'}
     const response = await request(app).put(`/api/todos/${id}`).set("authorization", `Bearer ${header}`).send(isi);
     expect(response.status).toBe(404);
     expect(response.body.message).toBe('Item not found');
     //console.log(response.body)
     });
     test('missing title', async () => {
     const id =  3
     const isi = {title:'',description:'ayam'}
     const response = await request(app).put(`/api/todos/${id}`).set("authorization", `Bearer ${header}`).send(isi);
     expect(response.status).toBe(400);
     expect(response.body.message).toBe('title is required');
     //console.log(response.body)
     });
    

    test('missing description', async () => {
    const id =  35
    const isi = {title:'Buy'}
    const response = await request(app).put(`/api/todos/${id}`).set("authorization", `Bearer ${header}`).send(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('description is required');
    //console.log(response.body)
    });
});
 


describe("delete",()=>{
    test('succesfully', async () => {
    const id =  19
    const response = await request(app).delete(`/api/todos/${id}`).set("authorization", `Bearer ${header}`);
    expect(response.body.message).toBe('succesfully');
    expect(response.status).toBe(200);    
    });

    test("can't find id", async () => {
    const id =  50
    const response = await request(app).delete(`/api/todos/${id}`).set("authorization", `Bearer ${header}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Item not found');
    
    });
})



describe("pagination", () => {
  test("succesfully", async () => {
    const isi = { limit: 5, page: 1 };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
  });

  test("limit / page not number", async () => {
    const isi = { limit: 5, page: "abc" };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("limit and page must be number");
  });
  test("missing limit", async () => {
    const isi = { limit: " ", page: 3 };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("limit is required");
  });
  test("missing page", async () => {
    const isi = { limit: 3, page: " " };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("page is required");
  });
});
 

describe("filtering", () => {
  test("sucessfully", async () => {
    const isi = { column: "title", value: "Buy" };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("result");
  });
  test("missing value ", async () => {
    const isi = { column: "title", value: " " };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("value is required");
  });
  test("id type is not number ", async () => {
    const isi = { column: "id", value: "abc" };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("id must be number");
  });
});
describe("sorting", () => {
  test("sucessfully", async () => {
    const isi = { column: "title", sort: "desc" };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("result");
  });
  test("missing column", async () => {
    const isi = { column: " ", sort: "desc" };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("column is required");
  });
  test("wrong sort value ", async () => {
    const isi = { column: "id", sort: "des" };
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Database Error saat mengurutkan data");
  });
  test("missing type of sort", async () => {
    const isi = { column: "id" };
    console.log("pertama", typeof isi.page);
    const response = await request(app)
      .get("/api/todos")
      .set("authorization", `Bearer ${header}`)
      .query(isi);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "you must input values of limit,page,column,value,sort"
    );
  });
});
