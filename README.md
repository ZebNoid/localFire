# localFire

Browser tabs sync event snippet


## Example

```javascript
localFire.on(data => {
    // process event on other tabs
    console.log(data);
});

setTimeout(() => {
    // send event to tabs
    localFire.send('some data');
}, 1000);

```
