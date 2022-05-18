require('dotenv').config();
let mongoose = require('mongoose');
const uriMongo = process.env.MONGO_URI;
mongoose.connect(uriMongo, {useNewUrlParser: true});

const { Schema } = mongoose;

let personSchema = new Schema(
  {
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [{type: String}]
  }
);

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = async (done) => {
  let person = new Person({
    name: "Pai", age: 19, favoriteFoods: ["egg", "banana"]
  });
  await person.save();
  done(null , person);
};


const createManyPeople = async (arrayOfPeople, done) => {
  let people = await Person.create(arrayOfPeople);
  done(null , people);
};

const findPeopleByName = async (personName, done) => {
  let people = await Person.find({name: personName});
  done(null , people);
};

const findOneByFood = async (food, done) => {
  let person = await Person.findOne({favoriteFoods: food});
  done(null , person);
};

const findPersonById = async (personId, done) => {
  let person = await Person.findById(personId);
  done(null , person);
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  let person = await Person.findById(
    personId, 
    function(err, person) {
      person.favoriteFoods.push(foodToAdd)
      person.save();                                 
    });
  console.log(person);

  done(null , person);
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  const condition = {name: personName};
  let person = await Person.findOneAndUpdate(
    condition, 
    {age: ageToSet}, 
    {new: true, useFindAndModify: false}
  );

  done(null , person);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
