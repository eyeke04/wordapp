var config = {
	apiKey: "AIzaSyA_5ztecbu_pVMx3sfklWFpKBbWb4Wypw0",
	authDomain: "gospoteric-wordbox-23.firebaseapp.com",
	databaseURL: "https://gospoteric-wordbox-23.firebaseio.com",
	storageBucket: "gospoteric-wordbox-23.appspot.com",
};
firebase.initializeApp(config);

var auth = firebase.auth();
var storageRef = firebase.storage().ref();

function cancel_upload(uploadTask) {
  console.log(uploadTask)
  uploadTask.cancel();
  document.getElementById('upload_progress').innerHTML = '';
  document.getElementById('file').files = '';
  document.getElementById('upload').disabled = true;
}

function delete_upload(fileRef) {
  console.log(fileRef);
  // Delete the file
  fileRef.delete().then(function() {
    // File deleted successfully
    document.getElementById('upload_progress').innerHTML = '';
    document.getElementById('file').files = '';
    document.getElementById('img_hidden').value = '';
    document.getElementById('upload').disabled = true;

  }).catch(function(error) {
    alert("Delete Error: Something went wrong, please retry");
  });
}



function handleFileSelect(evt) {
  var level = 'org';
  evt.stopPropagation();
  evt.preventDefault();
  var file = document.getElementById('file').files[0];
  
  var metadata = {
    'contentType': file.type
  };
  // Push to child path.
  var fileRef = storageRef.child('images/'+ level +'/' + Date.now() + '/' + file.name);
  var uploadTask = fileRef.put(file, metadata);
  
  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.RUNNING: // or 'running'
          //display uploading gif
          
          document.getElementById('upload_progress').innerHTML = "<img src='../images/uploading.gif'> File: "+ document.getElementById('file').files[0].name + "<a class='btn btn-warning' id='cancel_upload'>Cancel</a>";
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      alert('Upload Error: Something went wrong, please retry');
      console.log(error);
  }, function() {
    // Upload completed successfully, now we can get the download URL
    var downloadURL = uploadTask.snapshot.downloadURL;
    document.getElementById('upload_progress').innerHTML = "<p>Upload Complete</p>";
    document.getElementById('img_hidden').value = downloadURL;
  });
  
}
window.onload = function() {
  document.getElementById('file').addEventListener('change', function(evt) {
  	var img = ['image/png', 'image/jpeg'];
  	var img_format = this.files[0].type;
  	if (img.indexOf(img_format) != -1) {
  		//it is the required image format
  		document.getElementById('upload').disabled = false;
  	}else{
  		document.getElementById('upload').disabled = true;
  		document.getElementById('file').files = '';
      alert('Invalid image format. Please Upload either a png file or a jpg file.');
  	}
  });
  document.getElementById('upload').addEventListener('click', handleFileSelect, false);
  document.getElementById('upload').disabled = true;
  
  // Sign the user in anonymously since accessing Storage requires the user to be authorized.
  auth.signInAnonymously().then(function(user) {
    console.log('Anonymous Sign In Success');
    document.getElementById('file').disabled = false;
  }).catch(function(error) {
    console.error('Anonymous Sign In Error', error);
  });
}