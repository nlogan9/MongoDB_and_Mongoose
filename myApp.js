require('dotenv').config();
const mongoose = require('mongoose');

let Person = require('./models/person');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createAndSavePerson = (done) => {
  let someone = new Person({
    name: "Bodhi",
    age: 1,
    favoriteFoods: ["bananas", "strawberries"]
  })

  someone.save((err, data) => {
    if (err) return done(err);
    done(null , data);
  });

  
};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null , data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({
      name: personName
    }, (err, data) => {
    if (err) return done(err);
    done(null , data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: food
  }, (err, data) => {  
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({
    _id: personId
  }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({
    _id: personId
  }, (err, update) => {
    if (err) return done(err);
    update.favoriteFoods.push(foodToAdd);
    update.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    })
  });
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({
    name: personName
  }, 
  {
    age: ageToSet
  },
  {
    new: true
  }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    {_id: personId},
    (err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({
    name: nameToRemove
  }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({
    favoriteFoods: foodToSearch
  }).sort({ name: 'asc' }).limit(2).select('-age').exec((err, data) => {
    if (err) return done(err);
    done(null, data);
  })
  
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
