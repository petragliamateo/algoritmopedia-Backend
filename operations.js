const mysql = require('mysql');

function readAll(connection, callback){
  connection.query('SELECT * FROM `wp_posts`', (error, result) => {
    if (error) { throw error; }
    callback(result);
  })
}

async function readPosts(connection, callback){
  // Contenido: post_content
  // Los post son los que tienen las propr post_type: post, y post_stats: pusblish
  await connection.query('SELECT post_title, post_name, post_date, post_content FROM `wp_posts` WHERE post_type = "post" AND post_status = "publish"', (error, result) => {
    if (error) { throw error; }
    callback(result);
  })
}

module.exports = { readPosts };
