const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

 function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?like_name=${searchTerm}`
    fetch(url)
      .then((response) => response.json())
      .then((result) => displayResults(result))
      .catch((error) => console.error('Error fetching data:', error))
 }

 function displayResults(results) {
  resultPlaylist.classList.add('hidden');
  const artistsContainer = document.getElementById('artists-container');
  artistsContainer.innerHTML = ''; // Limpa o conteúdo anterior

  if (results.length === 0) {
      // Tratar caso em que a API retorna um array vazio
      console.log('Nenhum artista encontrado.');
      // Pode exibir uma mensagem para o usuário ou fazer outras ações necessárias.
  } else {
      results.forEach(element => {
          const artistDiv = document.createElement('div');
          const artistName = document.createElement('p');
          const artistImage = document.createElement('img');

          artistName.innerText = element.name;
          artistImage.src = element.urlImg;

          artistDiv.appendChild(artistName);
          artistDiv.appendChild(artistImage);
          artistsContainer.appendChild(artistDiv);
      });

      resultArtist.classList.remove('hidden');
  }
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if(searchTerm === '') {
      resultPlaylist.classList.add('hidden');
      resultArtist.classList.remove('hidden');
      return;
    }

    requestApi(searchTerm);
})