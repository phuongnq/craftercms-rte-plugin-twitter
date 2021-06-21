(function () {

  'use strict';

  const loadJS = function(url, implementationCode, location) {
    const scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
  };

  const TWITTER_EMBED_API = `${window.location.origin}/api/tweet.json?tweetId=`;
  tinymce.PluginManager.add("embed_tweet_static", function (editor, url) {
    const dialogConfig =  {
      title: 'Input Tweet ID',
      body: {
        type: 'panel',
        items: [
          {
            type: 'input',
            name: 'tweetId',
            label: 'Enter Tweet ID'
          }
        ]
      },
      buttons: [
        {
          type: 'cancel',
          name: 'closeButton',
          text: 'Cancel'
        },
        {
          type: 'submit',
          name: 'submitButton',
          text: 'Insert Code',
          primary: true
        }
      ],
      initialData: {
        tweetId: '',
      },
      onSubmit: function (api) {
        const data = api.getData();
        const url = `${TWITTER_EMBED_API}${data.tweetId}`;

        fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          tinymce.activeEditor.execCommand('mceInsertRawHTML', false, JSON.parse(data).html);
          api.close();
        });
      }
    };

    function _showDialog() {
      editor.windowManager.open(dialogConfig);
    }

    // Define the Toolbar button
    editor.ui.registry.addButton('embed_tweet_static', {
        text: "Add Tweet Embed Static",
        onAction: _showDialog
    });
  });


  return {
    getMetadata: function () {
      return {
        name: "Embed Tweet Static",
        url: "http://exampleplugindocsurl.com"
      };
    }
  };
})();