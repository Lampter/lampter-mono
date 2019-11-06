# Server

### Start Server: 

```yarn start```


### Build DB from scratch when starting the server:

In ./scr/index.js
```
await db.sync({
  // force: true, <-- Uncomment this line
  alter: true, <-- Comment this line
});
```

### Reading Material: 

[sequelize-typescript: (https://github.com/RobinBuschmann/sequelize-typescript)](https://github.com/RobinBuschmann/sequelize-typescript)

[type-graphql: (https://github.com/MichalLytek/type-graphql)](https://github.com/MichalLytek/type-graphql)

[ts-sequelize-graphql-boilerplate: (https://github.com/ke-d/typescript-sequelize-graphql-boilerplate)](https://github.com/ke-d/typescript-sequelize-graphql-boilerplate)



