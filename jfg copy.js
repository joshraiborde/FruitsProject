// <% posts.forEach(post => {%>
 
  
//       <%= post.content %>
//       <a href="/posts/<%=post.title%>">Read More</a>
//       <% }; %>
// <%  }); %>

// fruits.forEach(fruit => {
//   fruit.name
// });

Fruit.insertOne(pineapple, (error) => {
  if (error) {
    console.log(error + " " + now.toUTCString());
  } else {
    console.log(
      "Successfully saved fruits to fruitsDB on " + now.toUTCString()
    );
  }
});