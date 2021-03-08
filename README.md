# Audio Rooms for Facebook Groups
During quarantine, more and more virtual communities have emerged as a way for people to stay connected.

Users now engage more with Facebook groups as the social network shifts toward meaningful communities. The company recently spent an estimated 10 million dollars to promote Facebook Groups.

While there are over 400 million communities on Facebook, communities rely on external tools to host live panel discussions. The lack of functionality is driving users to competitors like ClubHouse, Discord, Zoom and more.

So we asked ourselves, how might we create a live panel experience for communities and increase user engagement on Facebook groups?


Introducing Audio Rooms for Facebook groups. Our audio solution makes knowledge sharing and networking a frictionless, single-platform experience.

Members of a Facebook group can hop onto the Audio Room tab and listen in on live expert insights right within the group. Here we’ve demonstrated the use case of a hackathon group, but these audio rooms can really build social value in a variety of use cases, both amongst friends like if you wanted to host an NFL Fantasy Draft, as well as in large scale groups like facilitating fireside chats and mental health panels.

# Figma Design
[Link](https://www.figma.com/file/igXoS7QpgR9Rr0aoPvD4J5/FB?node-id=30%3A43)

# Tech Stack
- React
- NodeJS
- DynamoDB
  - Stored questions for speakers and their respective upvotes.
- Facebook Oauth/GraphQL
  - Helped gain access to Facebook APIs which allowed us to retrieve real user profile images.
- Twilio
  - Hosted voice & audio streaming / real time messaging chat capabilities.
- Websockets
  - Required to update active participants of speaker/listener status and question upvotes.
    