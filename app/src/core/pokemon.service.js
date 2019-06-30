(function () {
  'use strict';

  angular
    .module('core')
    .factory('Pokemon', Pokemon);

  Pokemon.$inject = ['$http'];

  function Pokemon($http) {

    var pokemons = [];

    return {
      // getPokemonsByOffset: getPokemonsByOffset,
      getPokemonById: getPokemonById,
      getPokemonSpecies: getPokemonSpecies,
      getCachedPokemons: getCachedPokemons
    };

    function getCachedPokemons() {
      return pokemons;
    }

    function getPokemonSpecies(url) {
      if (!url) return;

      return $http.get(url)
        .then(requestComplete)
        .catch(requestFailed);
    }

    function getPokemonById(id) {
      if (!id) return;

      var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + id + "/";
     
      return $http.get(apiUrl)
        .then(function (response) {
          pokemons.push(response);
          return response;
        })
        .catch(requestFailed);
    }

    /**
     * Get the list of pokemons based on offset
     * @param {Integer} offset The offset from where to start getting the data
     */
    // function getPokemonsByOffset(url) {
    //   var apiUrl = url || "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12";

    //   return $http.get(apiUrl)
    //     .then(requestComplete)
    //     .catch(requestFailed);
    // }

    function requestComplete(response) {
      return response;
    }

    function requestFailed(error) {
      console.log('XHR Failed for getPokemons.' + error.data);
    }
  }
})();