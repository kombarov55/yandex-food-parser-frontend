import React from "react";
import {Placemark} from "react-yandex-maps";

export default ({v}) => {
    function workTime() {
        if (v.open_at && v.close_at) {
            return `${v.open_at}-${v.close_at}<br/>`
        } else {
            return ""
        }
    }

    return <Placemark key={"sample"}
                      modules={['geoObject.addon.balloon']}
                      geometry={[v.latitude, v.longitude]}
                      properties={{
                          balloonContentHeader: `<a href=${v.link}>${v.name}</a>`,
                          balloonContentBody: `${v.address}<br/>` +
                              workTime() +
                              `Рейтинг: ${v.rating}/5 (${v.rating_count} оценок)`
                      }}
    />

}