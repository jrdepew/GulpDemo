# Demonstration
<p>This is just a first pass at deploying NodeJS and Gulp for performance enhancements and frontend efficiency

<h3>Packages Included</h3>
<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr><td>Uglify</td><td>JavaScript parser, mangler/compress and beautify toolkit</td></tr>
  <tr><td>Concat</td><td>Concatenate files</td></tr>
  <tr><td>JSHint</td><td>check JS files for errors</td></tr>
  <tr><td>Jade</td><td>markdown template engine</td></tr>
  <tr><td>CSSComb</td><td>CSScomb is a coding style formatter for CSS</td></tr>
  <tr><td>AutoPrefixer</td><td>adds prefixes (ex: :fullscreen becomes :moz-fullscreen)</td></tr>
  <tr><td>MinifyCSS</td><td>gulp version of clean css (minifier)</td></tr>
  <tr><td>Watch</td><td>Watch, that actually is an endless stream</td></tr>
  <tr><td>Plumber</td><td>Prevent pipe breaking caused by errors from gulp plugins</td></tr>
  <tr><td>Clean</td><td>A gulp plugin for removing files and folders</td></tr>
  <tr><td>gUtil</td><td>utilities to work with gulp</td></tr>
  <tr><td>ImageMin</td><td>Minify PNG, JPEG, GIF and SVG images</td></tr>
  <tr><td>PNGQuant</td><td>The pngquant utility as a readable/writable stream</td></tr>
  <tr><td>Notify</td><td>gulp plugin to send messages based using the node-notifier</td></tr>
  <tr><td>SpriteSmith</td><td>Convert images into spritesheets and coordinate maps</td></tr>
</tbody>
</table>

<ol>
  <li>Install Node.js from <a href="https://nodejs.org/" target="_blank">NodeJS.org</a></li>
  <li>Open up a command prompt.
    <ul>
      <li>Verify that node is install [node -v]</li>
      <li>Install Gulp [$ npm install --global gulp]</li>
      <li>Verify that Gulp is installed [gulp -v]</li>
      <li>Navigate to the project folder</li>
        <ul>
          <li>install the dependencies [npm install]</li>
        </ul>
      </li>
    </ul>
  </li>
</ol>
#### The Paths
In this section we are creating the paths that are used in the tasks.
<pre>
var paths = {
  loc: {
      build:      './_01-build/',
      stage:      './_02-stage/',
      prod:       './_03-prod/'
  }
}
</pre>

<p>The plan is to make all of your changes in the paths.loc.build and then have those changes copied to paths.loc.stage and paths.loc.prod.
#### The Tasks
<ul>
  <li><b>gulp js</b><br><i>check the javascript for errors, parse and beautify the scripts, concatenate the files into one file (name: (config.name).app.min.js), copy the file to <code>paths.loc.stage</code> and <code>paths.loc.prod</code>, and finally notify us that the task is done.</i></li>
  <li>gulp css</li>
  <li>gulp images</li>
  <li>gulp copyfonts</li>
  <li>gulp copybscss</li>
  <li>gulp copybsjs</li>
  <li>gulp jquery</li>
</ul>
