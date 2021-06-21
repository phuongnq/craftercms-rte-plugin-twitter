(function () {

  'use strict';

  tinymce.PluginManager.add("embed_tweet_dynamic", function (editor, url) {
    var dialogConfig =  {
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
        var data = api.getData();
        tinymce.activeEditor.execCommand('mceInsertRawHTML', false, `<span class="tweet-embed">[TWEET:${data.tweetId}]</span>`);
        api.close();
      }
    };

    function _showDialog() {
      editor.windowManager.open(dialogConfig);
    }

    // Define the Toolbar button
    editor.ui.registry.addButton('embed_tweet_dynamic', {
        text: "Add Tweet Embed Dynamic",
        onAction: _showDialog
    });
  });


  return {
    getMetadata: function () {
      return {
        name: "Embed Tweet",
        url: "http://exampleplugindocsurl.com"
      };
    }
  };
})();