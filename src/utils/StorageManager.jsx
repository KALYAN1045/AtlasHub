export default StorageManager = {
  getFavorites: () => {
    const favorites = localStorage.getItem("favoriteCountries");
    return favorites ? JSON.parse(favorites) : [];
  },
  setFavorites: (favorites) => {
    localStorage.setItem("favoriteCountries", JSON.stringify(favorites));
  },
};
