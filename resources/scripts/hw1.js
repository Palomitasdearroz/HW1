var dialog = document.querySelector('dialog');
function showDialog() {
    console.log('Fired');
    dialog.show();
    setTimeout(function () {
        dialog.close();
      }, 3000);
}