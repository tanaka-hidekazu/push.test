'use strict';

self.addEventListener('push', function(event) {
  console.log('Received a push message', event);

  // サンプルでは固定のメッセージを通知するようにしています。
  // 動的にユーザーごとにメッセージを変えたい場合は、
  // ペイロードの暗号化を行うか、FetchAPIで動的に情報を取得する必要があります。
  var title = 'Push テストです。';
  var body = 'Push Test です。';
  var icon = 'ics_logo_512x512.png';
  var tag = 'simple-push-demo-notification-tag';
  var url = 'https://tanaka-hidekazu.github.io/';
  if(event.data)body += "\n Text:"+event.data.text();

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
      data: {
        url: url
      }
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

 var notoficationURL = "/"
  if (event.notification.data.url) {
    notoficationURL = event.notification.data.url
  }
  
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow(notoficationURL);
    }
  }));
});
