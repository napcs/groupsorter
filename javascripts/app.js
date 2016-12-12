/*
 * GroupSorter
 */
var form = document.getElementById("groupmaker");

form.addEventListener("submit", function(event){
  event.preventDefault();

  var arrayOfNames = [];
  var names;
  var numberOfGroups;

  names                = document.getElementById("names").value;
  numberOfGroups       = document.getElementById("number_of_groups").value;
  minimumNumberInGroup = document.getElementById("minimum_number_in_group").value;

  numberOfGroups       = Number(numberOfGroups);
  minimumNumberInGroup = Number(minimumNumberInGroup);
  arrayOfNames         = names.split("\n");

  maker                = new GroupMaker(arrayOfNames, numberOfGroups, minimumNumberInGroup, "output")
  maker.makeGroups();

});

var GroupMaker = function(arrayOfNames, numberOfGroups, minimumNumberInGroup, id){
  this.arrayOfNames         = arrayOfNames.filter(Boolean);
  this.groups               = [];
  this.id                   = id;
  this.minimumNumberInGroup = minimumNumberInGroup;
  this.numberOfGroups       = numberOfGroups;
};

GroupMaker.prototype.makeGroups = function(){
  this.sort();
  this.display();
}

GroupMaker.prototype.sort = function(){

  // var minimumNumberInGroup = Math.floor(arrayOfNames.length / numberOfGroups);
  var randomizedNames = [];

  // Create randomized array
  while(this.arrayOfNames.length > 0){
    var number = Math.floor(Math.random() * this.arrayOfNames.length);  
    name = this.arrayOfNames.splice(number, 1);
    randomizedNames.push(name);
  }

  // sort into groups by slicing up the array into equal sized chunks
  for (i=0; i< randomizedNames.length; i+= this.minimumNumberInGroup) {
    this.groups.push(randomizedNames.slice(i, i + this.minimumNumberInGroup));
  }

  this.normalize();
};

// Place leftover members into the existing groups
GroupMaker.prototype.normalize = function(){
  while(this.groups.length > this.numberOfGroups){
    var extraGroup = this.groups.pop();
    while(extraGroup.length > 0){
      for(x = 0; x < this.groups.length; x++){
        var name = extraGroup.splice(-1, 1)[0];
        if(name !== undefined) this.groups[x].push(name);
      }
    }
  }
}

// Displays output to the specified div
GroupMaker.prototype.display = function(){

  var output = document.getElementById(this.id);
  output.innerHTML = "";

  for(var group = 0; group < this.groups.length; group++){

    var div          = document.createElement("div");
    var header       = document.createElement("h1");
    var header2      = document.createElement("h2");
    header.innerHTML = "Group " + (group + 1);

    div.appendChild(header);

    header2.innerHTML = this.groups[group].length + " members"

    div.appendChild(header2);

    for(var index = 0; index < this.groups[group].length; index++){
      var p = document.createElement("p");
      p.innerHTML = this.groups[group][index];
      div.appendChild(p);
    }

    output.appendChild(div);
  }
};
