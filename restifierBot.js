/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Slack Button application that adds a bot to one or many slack teams.

# RUN THE APP:
  Create a Slack app. Make sure to configure the bot user!
    -> https://api.slack.com/applications/new
    -> Add the Redirect URI: http://localhost:8000/oauth
  Run your bot from the command line:
    clientId=<my client id> clientSecret=<my client secret> port=8000 node slackbutton_bot_interactivemsg.js
# USE THE APP
  Add the app to your Slack by visiting the login page:
    -> http://localhost:8000/login
  After you've added the app, try talking to your bot!
# EXTEND THE APP:
  Botkit has many features for building cool and useful bots!
  Read all about it here:
    -> http://howdy.ai/botkit
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
/* Uses the slack button feature to offer a real time bot to multiple teams */
var Botkit = require('./lib/Botkit.js');
var fs = require('fs')
var mockData


initalizeMockData()
    // console.log(mockData)
var controller = Botkit.slackbot({
    // interactive_replies: true, // tells botkit to send button clicks into conversations
    json_file_store: './db_slackbutton_bot/',
}).configureSlackApp({
    clientId: "75395947618.92031652662"//process.env.clientId,
    clientSecret: "414406139ae2b29ea137d118fbad360f"//process.env.clientSecret,
    scopes: ['bot'],
});

controller.setupWebserver(8000, function(err, webserver) {
    controller.createWebhookEndpoints(controller.webserver);

    controller.createOauthEndpoints(controller.webserver, function(err, req, res) {
        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }
    });
});


// just a simple way to make sure we don't
// connect to the RTM twice for the same team
var _bots = {};

function trackBot(bot) {
    _bots[bot.config.token] = bot;
}

function initalizeMockData() {
    mockData = JSON.parse(fs.readFileSync('data/mockData.JSON').toString())
    // mockData.Users = getChannelUsersList()
}

function getChannelUsersList() {
    console.log
}

function insertUsers(reply) {
    for (var i = 0; i < mockData.Users.length; i++) {
        var user = mockData.Users[i]
        reply.attachments.push({
            // fallback: "Required plain-text summary of the attachment.",
            title: '',
            callback_id: 'addUser',
            attachment_type: 'default',
            actions: [{
                "name": user,
                "text": user,
                // "style": "danger",
                "type": "button",
                "value": user,
                "confirm": {
                    "title": " Add " + user + " to the admin group ?",
                    "text": "Are you sure you want to add " + user + " to the admin group ?",
                    "ok_text": "Yes",
                    "dismiss_text": "No"
                }
            }]
        })
    }
    return reply
}

function insertTables(reply) {
    for (var i = 0; i < mockData.Tables.length; i++) {
        var table = mockData.Tables[i]
        reply.attachments.push({
            title: '',
            callback_id: 'restifyTable',
            attachment_type: 'default',
            actions: [{
                "name": table,
                "text": table,
                // "style": "danger",
                "type": "button",
                "value": table,
                "confirm": {
                    "title": " Restify " + table,
                    "text": "Are you sure you want to restify " + table,
                    "ok_text": "Yes",
                    "dismiss_text": "No"
                }
            }]
        })
    }

    return reply
}

function insertHTTPVerbs(reply, tableName) {
    for (var i = 0; i < mockData.HTTPVerbs.length; i++) {
        var verb = mockData.HTTPVerbs[i]
        reply.attachments.push({
            title: '',
            callback_id: 'restifyTableWithVerb',
            attachment_type: 'default',
            actions: [{
                "name": verb,
                "text": verb,
                // "style": "danger",
                "type": "button",
                "value": verb + "_" + tableName
                    // "confirm": {
                    //     "title": " Restify " + table,
                    //     "text": "Are you sure you want to restify " + table,
                    //     "ok_text": "Yes",
                    //     "dismiss_text": "No"
                    // }
            }]
        })
    }

    return reply
}

function insertQuota(reply) {
    for (var i = 0; i < mockData.Quota.length; i++) {
        var quota = mockData.Quota[i]
        reply.attachments.push({
            title: '',
            callback_id: 'quotaadded',
            attachment_type: 'default',
            actions: [{
                "name": quota,
                "text": quota,
                // "style": "danger",
                "type": "button",
                "value": quota
                    "confirm": {
                        "title": " Configure " + quota,
                        "text": "Are you sure you want to set this quota: " + quota,
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
            }]
        })
    }

    return reply   
}

function insertEndpoints(reply) {
    for (var i = 0; i < mockData.Endpoints.length; i++) {
        var endpoint = mockData.Endpoints[i]
        reply.attachments.push({
            title: '',
            callback_id: 'restifyTableWithVerb',
            attachment_type: 'default',
            actions: [{
                "name": verb,
                "text": verb,
                // "style": "danger",
                "type": "button",
                "value": verb + "_" + tableName
                    // "confirm": {
                    //     "title": " Restify " + table,
                    //     "text": "Are you sure you want to restify " + table,
                    //     "ok_text": "Yes",
                    //     "dismiss_text": "No"
                    // }
            }]
        })
    }

    return reply   
}


controller.on('interactive_message_callback', function(bot, message) {

    console.log(message.callback_id)
    console.log(message)
    console.log('interactive message callback got a hit')
        // var ids = message.callback_id.split(/\-/);
        // var user_id = ids[0];
        // var item_id = ids[1];

    var reply = {
        attachments: []
    }


    if (message.callback_id == 'addUsers') {
        reply.text = 'Cool, whom do you want to ?'
        reply = insertUsers(reply)
        bot.reply(message, reply)
    } else if (message.callback_id == 'restifyTables') {
        reply.text = 'Cool, which table would you like to restify ?'
        reply = insertTables(reply)
        bot.reply(message, reply)
    } else if (message.callback_id == 'configAPIGateway') {
        reply.text = 'Cool, what quota configurations do you want to add ?'
        reply = insertQuota(reply)
        bot.reply(message, reply)
    } else if (message.callback_id == 'addUser') {
        var user = message.actions[0].value
        if (mockData.AuthorizedUsers.indexOf(user) == -1) {
            console.log('user added to the AuthorizedUsers list ')
            mockData.AuthorizedUsers.push(user)
            reply.text = ":white_check_mark: " + user + " Successfully added to the Authorized Users list !!!"
        } else {
            console.log('user already in the AuthorizedUsers list')
            reply.text = ":x: " + user + " is already in the Authorized Users list !!!"
        }
        bot.reply(message, reply)
    } else if (message.callback_id == 'restifyTable') {

        var tableName = message.actions[0].value
        reply = insertHTTPVerbs(reply, tableName)
        reply.text = "What should be the verb for the endpoint ?"
        bot.reply(message, reply)
    } else if (message.callback_id == 'restifyTableWithVerb') {
        var values = message.actions[0].value.split('_')
        var verb = values[0]
        var tableName = values[1]
        reply.text = ":white_check_mark: " + tableName + " has been restified with " + verb + " endpoint !! :champagne: :confetti_ball: \n\n Endpoint " + verb + " http://starwarsfan.com/" + tableName + " created !!"
        mockData.Endpoints.push(verb +" "+  "http://starwarsfan.com/" + tableName )
        console.log(mockData.Endpoints)
        bot.reply(message, reply)
    } else if (message.callback_id == 'quotaadded') {

        var value = message.actions[0].value
        reply.text = "Quota has been successfully updated"
        bot.reply(message, reply)
    }

    // controller.storage.users.get(user_id, function(err, user) {

    //     if (!user) {
    //         user = {
    //             id: user_id,
    //             list: []
    //         }
    //     }

    //     for (var x = 0; x < user.list.length; x++) {
    //         if (user.list[x].id == item_id) {
    //             if (message.actions[0].value == 'flag') {
    //                 user.list[x].flagged = !user.list[x].flagged;
    //             }
    //             if (message.actions[0].value == 'delete') {
    //                 user.list.splice(x, 1);
    //             }
    //         }
    //     }


    //     var reply = {
    //         text: 'Here is <@' + user_id + '>s list:',
    //         attachments: [],
    //     }

    //     for (var x = 0; x < user.list.length; x++) {
    //         reply.attachments.push({
    //             title: user.list[x].text + (user.list[x].flagged ? ' *FLAGGED*' : ''),
    //             callback_id: user_id + '-' + user.list[x].id,
    //             attachment_type: 'default',
    //             actions: [{
    //                 "name": "flag",
    //                 "text": ":waving_black_flag: Flag",
    //                 "value": "flag",
    //                 "type": "button",
    //             }, {
    //                 "text": "Delete",
    //                 "name": "delete",
    //                 "value": "delete",
    //                 "style": "danger",
    //                 "type": "button",
    //                 "confirm": {
    //                     "title": "Are you sure?",
    //                     "text": "This will do something!",
    //                     "ok_text": "Yes",
    //                     "dismiss_text": "No"
    //                 }
    //             }]
    //         })
    //     }

    //     bot.replyInteractive(message, reply);
    //     controller.storage.users.save(user);


    // });



});


controller.on('create_bot', function(bot, config) {

    if (_bots[bot.config.token]) {
        // already online! do nothing.
    } else {
        bot.startRTM(function(err) {

            if (!err) {
                trackBot(bot);
            }

            bot.startPrivateConversation({
                user: config.createdBy
            }, function(err, convo) {
                if (err) {
                    console.log(err);
                } else {
                    convo.say('I am a bot that has just joined your team');
                    convo.say('You must now /invite me to a channel so that I can be of use!');
                }
            });

        });
    }

});


// Handle events related to the websocket connection to Slack
controller.on('rtm_open', function(bot) {
    console.log('** The RTM api just connected!');
    bot.api.users.list({}, function (err, response) {
        var Users = []
        if (response.hasOwnProperty('members') && response.ok) {
            var total = response.members.length;
            for (var i = 0; i < total; i++) {
                var member = response.members[i];
                Users.push(member.name)
            }
            // console.log(Users)
            mockData.Users = Users
        }
    })
})

controller.on('rtm_close', function(bot) {
    console.log('** The RTM api just closed');
    // you may want to attempt to re-open
});


controller.hears(['add (.*)'], 'direct_mention,direct_message', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {

        if (!user) {
            user = {
                id: message.user,
                list: []
            }
        }

        user.list.push({
            id: message.ts,
            text: message.match[1],
        });

        bot.reply(message, 'Added to list. Say `list` to view or manage list.');

        controller.storage.users.save(user);

    });
});


controller.hears(['list', 'tasks'], 'direct_mention,direct_message', function(bot, message) {

    controller.storage.users.get(message.user, function(err, user) {

        if (!user) {
            user = {
                id: message.user,
                list: []
            }
        }

        if (!user.list || !user.list.length) {
            user.list = [{
                'id': 1,
                'text': 'Test Item 1'
            }, {
                'id': 2,
                'text': 'Test Item 2'
            }, {
                'id': 3,
                'text': 'Test Item 3'
            }]
        }

        var reply = {
            text: 'Here is your list. Say `add <item>` to add items.',
            attachments: [],
        }

        for (var x = 0; x < user.list.length; x++) {
            reply.attachments.push({
                title: user.list[x].text + (user.list[x].flagged ? ' *FLAGGED*' : ''),
                callback_id: message.user + '-' + user.list[x].id,
                attachment_type: 'default',
                actions: [{
                    "name": "flag",
                    "text": ":waving_black_flag: Flag",
                    "value": "flag",
                    "type": "button",
                }, {
                    "text": "Delete",
                    "name": "delete",
                    "value": "delete",
                    "style": "danger",
                    "type": "button",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "This will do something!",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }]
            })
        }

        bot.reply(message, reply);

        controller.storage.users.save(user);

    });

});

// controller.hears('interactive', 'direct_mention,direct_message', function(bot, message) {

//     bot.reply(message, {
//         attachments: [{
//             fallback: "Main list",
//             title: 'Add a user perhaps?',
//             callback_id: 'addUser',
//             attachment_type: 'default',
//             actions: [{
//                     "name": "addUser",
//                     "text": "Add user to admin group",
//                     "value": "addUser",
//                     "type": "button",
//             }]
//         }, {
//             // fallback : "Required plain-text summary of the attachment.",
//             title: 'Restify a table for you?',
//             callback_id: 'restifyTable',
//             attachment_type: 'default',
//             actions: [{
//                 "name": "restifyTable",
//                 "text": "Restify Tables",
//                 "value": "restifyTable",
//                 "type": "button",
//             }]

//         }, {
//             // fallback : "Required plain-text summary of the attachment.",
//             title: 'Configure the AWS API gateway ?',
//             callback_id: 'configAPIGateway',
//             attachment_type: 'default',
//             actions: [{
//                 "name": "configAPIGateway",
//                 "text": "Confiure  Tables",
//                 "value": "configAPIGateway",
//                 "type": "button",
//             }]
//         }]
//     });
// });

// controller.hears('*', 'direct_mention,direct_message', function(bot, message) {
//     bot.reply(message, {
//         attachments: [{
//             title: 'What can I do for you ?',
//             callback_id: '123',
//             attachment_type: 'default',
//             actions: [{
//                 "name": "addUser",
//                 "text": "Add user to admin group",
//                 "value": "addUser",
//                 "type": "button",
//             }, {
//                 "name": "restifyTable",
//                 "text": "Restify Tables",
//                 "value": "restifyTable",
//                 "type": "button",
//             }, {
//                 "name": "configGateway",
//                 "text": "Configure API Gateway",
//                 "value": "configGateway"
//             }]
//         }]
//     });
// });


controller.hears('^stop', 'direct_message', function(bot, message) {
    bot.reply(message, 'Goodbye');
    bot.rtm.close();
});

controller.on(['direct_message', 'mention', 'direct_mention'], function(bot, message) {

    bot.reply(message, {
        text: "Hey hows it going !! What can I do for you today?",
        color: "RED",
        attachments: [{
            fallback: "Required plain-text summary of the attachment.",
            title: 'Add a user perhaps?',
            callback_id: 'addUsers',
            attachment_type: 'default',
            actions: [{
                    "name": "addUser",
                    "text": "Add user to admin group",
                    "value": "addUser",
                    "type": "button",
                }


            ]
        }, {
            // fallback : "Required plain-text summary of the attachment.",
            title: 'Restify a table for you?',
            callback_id: 'restifyTables',
            attachment_type: 'default',
            actions: [{
                "name": "restifyTable",
                "text": "Restify Tables",
                "value": "restifyTable",
                "type": "button",
            }]

        }, {
            // fallback : "Required plain-text summary of the attachment.",
            title: 'Configure the AWS API gateway ?',
            callback_id: 'configAPIGateway',
            attachment_type: 'default',
            actions: [{
                "name": "configAPIGateway",
                "text": "Confiure  Tables",
                "value": "configAPIGateway",
                "type": "button",
            }]
        }]
    });
});

controller.storage.teams.all(function(err, teams) {

    if (err) {
        throw new Error(err);
    }

    // connect all teams with bots up to slack!
    for (var t in teams) {
        if (teams[t].bot) {
            controller.spawn(teams[t]).startRTM(function(err, bot) {
                if (err) {
                    console.log('Error connecting bot to Slack:', err);
                } else {
                    trackBot(bot);
                }
            });
        }
    }

});
