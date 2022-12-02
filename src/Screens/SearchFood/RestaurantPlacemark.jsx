import React from "react";
import {Placemark} from "react-yandex-maps";

export default ({v}) => {
    return <Placemark key={"sample"}
                      modules={['geoObject.addon.balloon']}
                      geometry={[v.longitude, v.latitude]}
                      properties={{
                          balloonContentHeader: v.name,
                          balloonContentBody: `${v.address}<br/>` +
                              "08:00-20:00<br/>" +
                              `Рейтинг: ${v.rating}/5 (${v.rating_count} оценок)`
                      }}
    />

}