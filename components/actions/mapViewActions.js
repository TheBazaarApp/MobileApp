CHANGED_REGION = 'CHANGED_REGION';
CHANGED_MARKER_TITLE = 'CHANGED_MARKER_TITLE';
CHANGED_MARKER_REGION = 'CHANGED_MARKER_REGION';
SELECTED_MAP_REGION = 'SELECTED_MAP_REGION';
CANCELED_MAP_SELECT = 'CANCELED_MAP_SELECT';

export function changedRegion (region) {
  return {
    type: CHANGED_REGION,
    region: region
  }
}

export function changedMarkerTitle (text) {
  return {
    type: CHANGED_MARKER_TITLE,
    title: text
  }
}

export function changedMarkerRegion (coordinate) {
  return {
    type: CHANGED_MARKER_REGION,
    coordinate: coordinate
  }
}

export function selectedMapRegion (coordinate) {
  return {
    type: SELECTED_MAP_REGION,
    coordinate: coordinate
  }
}

export function canceledMapSelect () {
  return {
    type: SELECTED_MAP_REGION
  }
}
