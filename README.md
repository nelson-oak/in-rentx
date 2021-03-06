# RentX - Alugar Carros

Projeto desenvolvido no bootcamp Ignite da Rocketseat (trilha Node.js).

## Entidades

| Entidades | Atributos |
| - | - |
| cars | id, name, description, daily_rate, available, license_plate,  category_id, brand, fine_amount, created_at |
| categories | id, name, description, created_at |
| cars_image | id, car_id, image_name, created_at |
| specifications_cars | id, car_id, specification_id, created_at |
| specifications | id, name, description |
| rentals | id, car_id, user_id, start_date, end_date, expected_return_date, total, created_at, updated_at |
| users | id, name, password, email, driver_license, isAdmin, created_at |

## Recursos

- Express
- Typescript
- Docker
- Docker Compose
- TypeORM
- Postgres
- Jest
- Supertest

## Iniciando o projeto

Após clonar o projeto, é necessário atualizar as dependências.

### Comandos para baixar dependências e iniciar a aplicação

```bash
yarn
yarn dev
```
### Executar a aplicação com o docker compose

```bash
docker-compose up
```
Ou (executar e criar container)

```bash
docker-compose up -d
```
Para iniciar e parar a execução de um container já criado com **docker-compose up -d**, usar os comandos abaixo:

```bash
docker-compose start
docker-compose stop
```

## Executar testes da aplicação

Para executar os testes, basta utilizar o comando abaixo (necessita de um banco de testes **rentx_test** para executar):

```bash
yarn test
```

## Configurações adicionais

- Criar arquivo **.env** com o conteúdo de **.env.example**, adicionando os valores às variáveis
- Criar arquivo **ormconfig.json** com o conteúdo de **ormconfig.example.json**
- Colocar as configurações de banco de dados no **ormconfig.json**
- Se estiver usando o docker-compose, manter os dados de conexão que já estão em **ormconfig.json**, porém é necessário adicionar o ip do container do banco de dados
- Obter o IP do container (após ter iniciado com **docker-compose up -d**)
```bash
docker exec database_rentx cat /etc/hosts 
```
- Executar as migrations do banco de dados com o comando abaixo:
```bash
yarn typeorm migration:run
```
