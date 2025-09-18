// Attention! Replace XXX with userId between {} when declearing the URL to be fetched on line 6. 
function deleteItem(userId, callback) {
  fetch(`./users/${userId}`, { method: 'DELETE' })
    .then((res) => res.json())
    .then((response) => {
      return response.status != 200
        ? callback(response, undefined)
        : callback(undefined, response);
    })
    .catch((err) => {
      return callback(err, undefined);
    });
}

// This function is called from the button onclick attribute in the .pug file
function deleteButtonClicked(userId, buttonElement) {
  deleteItem(userId, (error, success) => {
    if (success) {
      // Remove the row of the user from the table
      const itemElement = buttonElement.closest('tr');
      if (itemElement) itemElement.remove();
      alert('User deleted successfully!');
    } else alert('Failed to delete user!');
  });
}