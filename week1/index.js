// var user = {
//   name: "john",
//   age: 20,
// };

// var user2 = {
//   name: "john",
//   age: 20,
// };

// var getAged = function (user, passedTime) {
//   var result = { ...user };
//   result.age += passedTime;
//   return result;
// };

// var agedUser = getAged(user, 6);

// var agedUserMustBeDifferentFromUser = function (user1, user2) {
//   if (!user2) {
//     console.log("Failed! user2 doesn't exist!");
//   } else if (user1 !== user2) {
//     console.log(
//       "Passed! If you become older, you will be different from you in the past!"
//     );
//   } else {
//     console.log("Failed! User same with past one");
//   }
// };

// agedUserMustBeDifferentFromUser(user, agedUser);

var fullname = "Ciryl Gane";

var fighter = {
  fullname: "John Jones",
  opponent: {
    fullname: "Francis Ngannou",
    getFullname: function () {
      return this.fullname;
    },
  },

  getName: function () {
    return this.fullname;
  },

  getFirstName: () => {
    return this.fullname.split(" ")[0];
  },

  getLastName: (function () {
    return this.fullname.split(" ")[1];
  })(),
};

console.log("Not", fighter.opponent.getFullname(), "VS", fighter.getName());
console.log(
  "It is",
  fighter.getName(),
  "VS",
  fighter.getFirstName(),
  fighter.getLastName
);
