import moment from 'moment';

export const addLayer = (layers, item) => {
  const sameLayer = layers.find(layer => layer.key === item.key);
  if (sameLayer) {
    const newLayer = { ...item, key: `${sameLayer.key}-${moment().valueOf()}` };
    return [newLayer, ...layers];
  }

  return [item, ...layers];
};

export const removeLayer = (layers, item) => {
  return layers.filter(layer => layer.key !== item.key);
};

export const addEvent = (layers, event) => {
  if (layers[0]) {
    const currentLayer = layers[0];

    const newEvent = Array.isArray(event) ? event : [event];
    const events = newEvent.map(item => ({ ...item, keyLayer: layers[0].key }));
    const newLayer = {
      ...currentLayer,
      events: [...events, ...currentLayer.events],
    };

    return layers.map((layer, index) => (index === 0 ? newLayer : layer));
  }

  return [...layers];
};

export const removeEvent = (layers, event) => {
  if (layers[0]) {
    const currentLayer = layers[0];
    if (event.layerKey === currentLayer.key) {
      const newLayer = {
        ...currentLayer,
        events: currentLayer.events.filter(
          item => item.keyCode !== event.keyCode,
        ),
      };

      return layers.map((layer, index) => (index === 0 ? newLayer : layer));
    }
  }

  return [...layers];
};

export const handleKeyUp = (e, layers) => {
  const layer = layers[0];
  if (layer) {
    const event = layer.events.find(item => item.keyCode === e.keyCode);

    // handle combo key
    if (event && event.controlKey) {
      if (e[event.controlKey]) {
        e.preventDefault();
        event.keyAction();
      }
    }

    // handle single key
    if (event && !event.controlKey) {
      e.preventDefault();
      event.keyAction();
    }
  }
};

export function getUrlParameter(name, location) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
