import { useEffect } from 'react';
import script from 'scriptjs';

const TWEETER_JS_API_URL = 'https://platform.twitter.com/widgets.js';


function App() {
  const content = `<p>Curabitur lobortis laoreet vehicula. Integer condimentum non mauris in bibendum. Morbi et facilisis nisl. In suscipit eros sapien, ut venenatis quam interdum gravida. Praesent ultricies interdum dictum. Phasellus lacinia diam eu porta rhoncus. Proin laoreet interdum semper.</p>
  <p><span class="tweet-embed">[TWEET:1337027549885566976]</span><br /></p>
  <p>Quisque at lacus sed augue varius varius sit amet in eros. Nunc ultrices mi ultrices eros blandit, eu convallis quam cursus. Nullam vel luctus est. Duis mollis nulla a arcu pellentesque sagittis. <span class="tweet-embed">[TWEET:1337027549885566976]</span>Aenean in quam et massa volutpat placerat a a enim. Donec pharetra mollis libero, vel volutpat nunc pellentesque eget. Nulla pharetra, ex a iaculis tempus, nulla nulla pellentesque odio, sed ultrices mauris nisi malesuada odio. Nulla dapibus rhoncus imperdiet. Aliquam quis nisl eget ipsum sagittis euismod ultrices vel lorem. Vivamus sit amet enim id lectus euismod varius eget in orci. Nunc convallis sapien mi, et faucibus turpis hendrerit vitae. Phasellus auctor imperdiet massa, nec condimentum nisl finibus eget.</p>
  <p><span class="tweet-embed">[TWEET:1337027549885566976]</span></p>`;

  const renderWidget = () => {
    if (!window.twttr) {
      console.error('Failure to load window.twttr in TwitterTweetEmbed, aborting load.')
      return
    }
    const docs = document.getElementsByClassName('tweet-embed');
    for (let i = 0; i < docs.length; i += 1) {
      const doc = docs[i];
      const tweetId = doc.innerHTML.match(/\d+/g)[0];
      if (!tweetId) continue;
      doc.innerHTML = '';
      window.twttr.widgets.createTweet(
        tweetId,
        doc,
        {}
      );
    }
  };

  useEffect(() => {
    script(TWEETER_JS_API_URL, 'twitter-embed', () => {
      renderWidget();
    })
  });

  return (
    <div className="App">
      <div className="article-content" dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
  );
}

export default App;