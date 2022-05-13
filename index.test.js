
const {sequelize} = require('./db');
const {Board, Cheese, User} = require('./index');

describe ( 'CRUD test', ()=>{
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    })
    test ('can create user', async () => {
        const user1 = await User.create({name:'Yared', Email:'abcd@gmail.com'})
        expect(user1.name).toBe('Yared');
        expect(user1).toBeInstanceOf(User);
    })
    test ('can create cheese', async () => {
        const Cheese1 = await Cheese.create({title:'Asiago', description:'a nutty-flavored cheese, comes in two forms: fresh and mature. The fresh has an off-white color and is smoother and milder, while mature Asiago is yellowish and somewhat crumbly.'})
        expect(Cheese1.title).toBe('Asiago')
    })
    test ('can create Board', async () => {
        const Board1 = await Board.create({type:'charcuterie', description:'a nutty-flavored cheese, comes in two forms: fresh and mature. The fresh has an off-white color and is smoother and milder, while mature Asiago is yellowish and somewhat crumbly.', rating: 4})
        expect(Board1.rating).toBe(4)
    })
    test ('can delete user', async () => {
        const user2 = await User.create({name:'Gari', Email:'abcd@gmail.com'})
        await User.destroy({where:{name:'Gari'}})
        expect(User).not.toContain(user2)
    })
    test ('can delete Board', async () => {
        const Board2 = await Board.create({type:'blabla', description:'a nutty-flavored cheese, comes in two forms: fresh and mature. The fresh has an off-white color and is smoother and milder, while mature Asiago is yellowish and somewhat crumbly.', rating: 3})
        await User.destroy({where:{name:'blabla'}});
        expect(Board).not.toContain(Board2);
    })
})

describe('Association test', () => {
test('one to many association test', async()=>{
    const BoardA = await Board.create({type:'board1', description:'this is description..', rating: 4});
    const BoardB = await Board.create({type:'board1', description:'this is description..', rating: 4});
    const BoardC = await Board.create({type:'board1', description:'this is description..', rating: 4});
    const user1 = await User.create({name:'Yared', Email:'abcd@gmail.com'})
    await user1.addBoard(BoardA)
    await user1.addBoard(BoardB)
    await user1.addBoard(BoardC)
    const FirstUserBoards = await user1.getBoards()
    expect(FirstUserBoards.length).toBe(3);
})
test('many to many association test', async()=>{
    const BoardA = await Board.create({type:'board1', description:'this is description..', rating: 4});
    const BoardB = await Board.create({type:'board1', description:'this is description..', rating: 4});
    const BoardC = await Board.create({type:'board1', description:'this is description..', rating: 4});
    const Cheese1 = await Cheese.create({title:'ACKAWI', description:'A Middle Eastern-style cheese with complex flavor.'})
    const Cheese2 = await Cheese.create({title:'BALADI', description:'A Middle Eastern cheese eaten as is with crackers, in sandwiches, or as an appetizer.'})
    const Cheese3 = await Cheese.create({title:'BRIE', description:'Soft-ripened cheese with edible white crust.'})
    await Cheese1.addBoard(BoardA)
    await Cheese1.addBoard(BoardB)
    await Cheese1.addBoard(BoardC)
    await BoardA.addCheese(Cheese1)
    await BoardA.addCheese(Cheese2)
    await BoardA.addCheese(Cheese3)
    const Cheese1OnBoards = await Cheese1.getBoards()
    const CheesesOnBoardA = await BoardA.getCheeses()
    expect(Cheese1OnBoards.length).toBe(3);
    expect(CheesesOnBoardA.length).toBe(3);
})
})

describe('Eager Loading',()=>{
    test('A board can be loaded with its cheeses', async ()=>{
        const CheesesOnBoards = await Board.findAll({
            include: [
                {
                    model:Cheese, As: 'cheeses-on-all-boards'
                }
            ]
        })
        expect(CheesesOnBoards.length).toBe(8)
    })
    test('A user can be loaded with its boards', async ()=>{
        const UserBoards = await User.findAll({
            include: [
                {
                    model:Board, As: 'user has boards'
                }
            ]
        })
        expect(UserBoards.length).toBe(2)
    })
    test('A cheese can be loaded with its board data', async ()=>{
        const CheeseBoards = await Cheese.findAll({
            include: [
                {
                    model:Board, As: 'user has boards'
                }
            ]
        })
        expect(CheeseBoards.length).toBe(4)
    })
})
