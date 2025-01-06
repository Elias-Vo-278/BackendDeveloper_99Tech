# CRUD Backend Server with ExpressJS

This project provides a backend server built with ExpressJS and Sequelize (using PostgreSQL) to demonstrate a basic CRUD application. It allows users to perform create, read, update, and delete operations on a resource.

---

## **Features**

1. Create a resource.
2. List resources with filters.
3. Retrieve details of a resource.
4. Update resource details.
5. Delete a resource (soft delete enabled).

---

## **Technologies**

- Node.js
- ExpressJS
- Sequelize ORM
- PostgreSQL
- Docker & Docker Compose

---

## **Getting Started**

### **Prerequisites**

Ensure the following tools are installed on your system:

- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

---

### **Setup Instructions**

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd <repository_name>

2. **Start docker**
    ```bash
    docker compose up -d

### **cURL**
1. Create a resource.

```
curl --location 'http://localhost:3000/v1/resources' \
--header 'Content-Type: application/json' \
--data '{
    "name": "test",
    "description": "test"
}'
```

2. List resources with filters.

```
curl --location 'http://localhost:3000/v1/resources?search=test&limit=10&page=1' \
--data ''
```

3. Retrieve details of a resource.

```
curl --location 'http://localhost:3000/v1/resources/:id' \
--data ''
```

4. Update resource details.

```
curl --location --request PUT 'http://localhost:3000/v1/resources/:id' \
--header 'Content-Type: application/json' \
--data '{
    "name": "test1",
    "description": "test1"
}'
```

5. Delete a resource (soft delete enabled).

```
curl --location --request DELETE 'http://localhost:3000/v1/resources/:id' \
--data ''
```
