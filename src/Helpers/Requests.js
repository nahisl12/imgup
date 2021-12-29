// function used for fetching data from back-end
const apiRequest = async (url, method, data) => {
  const request = await fetch(url, {
    method: method,
    headers: data.headers,
    body: JSON.stringify(data.body),
  });

  const response = await request.json();
  return response;
};

// Get all public images
export const getPublicImages = async () => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const data = await apiRequest("http://localhost:3001/api/image/", "get", requestData);
  return data;
};

// login to site
export const logIn = async (loginUsername, loginPassword) => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      username: loginUsername,
      password: loginPassword,
    },
  };

  const data = await apiRequest("http://localhost:3001/api/login", "post", requestData);
  return data;
};

// register a user
export const register = async (username, email, password, navigate) => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      username: username,
      email: email,
      password: password,
    },
  };

  const data = await apiRequest("http://localhost:3001/api/users", "post", requestData);
  return data;
};

// Request to obtain folders
export const getUserFolders = async (user) => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${user.accessToken}`,
    },
  };

  const data = await apiRequest("http://localhost:3001/api/users/folders", "get", requestData);
  return data;
};

// request for adding folders
export const addFolder = async (user, newFolderName) => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${user.accessToken}`,
    },
    body: {
      folder: newFolderName,
    },
  };

  const data = await apiRequest("http://localhost:3001/api/users/folders/new", "put", requestData);
  return data;
};

// Delete folder
export const deleteFolder = async (user, folder) => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${user.accessToken}`,
    },
    body: {
      folderName: folder,
    },
  };

  const data = await apiRequest("http://localhost:3001/api/users/folders/delete", "delete", requestData);
  return data;
};

// get the users images
export const getUserImages = async (user) => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${user.accessToken}`,
    },
  };

  const data = await apiRequest("http://localhost:3001/api/image/userImages", "get", requestData);
  return data;
};

// get the users images status/folder
export const changeImageStatus = async (user, id, newFolder, newStatus) => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${user.accessToken}`,
    },
    body: {
      imageId: id,
      folder: newFolder,
      status: newStatus,
    },
  };

  const data = await apiRequest("http://localhost:3001/api/image/edit", "put", requestData);
  return data;
};

// delete image from user
export const deleteUserImage = async (user, id) => {
  const requestData = {
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${user.accessToken}`,
    },
    body: {
      imageId: id,
    },
  };

  const data = await apiRequest("http://localhost:3001/api/image/delete", "delete", requestData);
  return data;
};
