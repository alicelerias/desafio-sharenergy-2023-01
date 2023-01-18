# App Sharenery 

![img_app](https://lh3.googleusercontent.com/JxJAYZrtBdMwkojKvyAB_qKvMQnjd1Yj3b-vJvaAtq0Ixyr9dbeeEQN9LbdTDirPkFj1wdNQ8AD8wQXi6-hDymkeR5EfxPXsuJ3dcrBFxSrPkxViYGYp_s4TEzbitiLJIvpCDBTREKNZRZbKtemmB1GKG-YfAB5FLz-0__RScpdjOvYbm2ORuEprg4f22r-z96zldS-KRo0feXvtvunVXHLRDDBJzMT415qpeA5nIwZL4rYKvT7oHIpKzJ5ybqCrNO90yCUx6xGs2k1KfywyqV9Qe_os141VyxCNxaj2PkBV2CXGBzGLu-_dW-MRtwhvtWf0LMEXHBOOjmGgzjbVAqctbEvuHvrphEwZVEni_6DfhxEQf9j7aT4XJFN7e4kCggQR-9FOvL3bwFzhuqTy1gV9OrB4pjf6tF94ITEfd7lOZThS5PTmxUnaBJ662hVTFDie1J7SUUmBSe-JEHGYsviTFZ4iLzz00lVX34XI4wpc7EEmhs_rIAYkCOmdslExQliVJ90MMbVsySyvGpKT7WnHOdsr6ThSquCBnkBIIRts8Wd5lEcIbvqTA7XNL723H11PmLqN41JW_xdxW9HoheKBqPJiQq9QolWrP1iNCnegHVQM1Bs3N6GaSVY8JMF2k-5MBuIraJFY0vODyNkG7UeAITOZtkWwLdpaFCLXkBQSjhB1NWRXMvwqAUGPUG_3pzlWKnJ3p1o6RinPj0ZRo3NX1hkualqkJJN8kqAQHnbBCTtBGBf01dJs9KLMA5IbgJqY3XVWkfiOhc2R1rFjK2i32eaRtfjo-pnT7eal_7SX4pBs4pIYBqwpyLTwVo_8CeTa3osDNwStWcnl-QclaL4uJddBakqB38rJVDtI1s9f2SQbwgS_ZbF_Gq_O8iLdnaglvq6pZVcC9up9c3If9a63ytEOlWbfLSPu4E46bLK_fg=w1215-h768-no?authuser=0)


# Descrição

O app Sharenergy foi desenvolvido para o Desafio Sharenergy. O backend da aplicação foi feito em Go, o banco de dados utilizado é o MongoDB, o frontend foi feito em React/Typescript e o style foi feito de maneira responsiva utilizando TailWind.

# Backend - GO

- `config`: atalhos para os conteúdos privados da aplicação;

- `auth`: arquivos de autenticação e token;

- `database`: conexão com o banco de dados MongoDB, queries e mutations da aplicação; 

- `models`: modelos do banco de dados;

- `server`: handlers das queries e mutations
Dentro dessa pasta, é possível encontrar o arquivo integration.go, que contém os handlers com endpoints externos;

- `types`: tipos utilizados na aplicação;

- `main.go`: endpoints;

# Frontend - TYPESCRIPT

- `api`: queries e mutations;

- `assets`: imagens do projeto;

- `components`: tsx components; 

- `configs`: atalhos para o conteúdo privado da aplicação;

- `types`: tipos utilizados na aplicação;

- `main.tsx`: Layout e rotas da aplicação;
