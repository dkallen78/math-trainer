function rnd(floor, ceiling) {
  //----------------------------------------------------//
  //Generates a random number within a range of numbers //
  //----------------------------------------------------//
  //floor(integer): lower bound of the random number    //
  //ceiling(integer): upper bound of the random number  //
  //----------------------------------------------------//
  //return(integer): random number w/in the range       //
  //----------------------------------------------------//

  let range = (ceiling - floor) + 1;
  return Math.floor((Math.random() * range) + floor);
}

rnd.index = function(array) {
  //----------------------------------------------------//
  //returns a random element from an array              //
  //----------------------------------------------------//
  //array(array): array from which to return a random   //
  //  element                                           //
  //----------------------------------------------------//
  //return(*): randomly selected array element          //
  //----------------------------------------------------//


  return array[rnd(0, array.length - 1)];
}