import React, { useCallback, useRef, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

// Center coords as a prop

interface IMapProps {
  idx: number;
  testingCenters: any[];
  center: { lat: number; lng: number };
  onMarkerClick: React.Dispatch<React.SetStateAction<number>>;
}

const Map = (props: IMapProps) => {
  const { idx, testingCenters, center, onMarkerClick } = props;

  const map = useRef(undefined);

  const getNewBounds = useCallback(() => {
    const bounds = new google.maps.LatLngBounds();
    testingCenters.forEach((data: any) =>
      bounds.extend({
        lat: data.center.coordinates[0],
        lng: data.center.coordinates[1],
      }),
    );
    if (!map.current) {
      return;
    }
    // @ts-ignore
    return map.current.fitBounds(bounds);
  }, [testingCenters]);

  useEffect(() => {
    getNewBounds();
  }, [getNewBounds, idx]);

  const onLoad = useCallback(
    (inst: any) => {
      console.log(map.current, 'map');
      const bounds = new google.maps.LatLngBounds();
      testingCenters.forEach((data: any) =>
        bounds.extend({
          lat: data.center.coordinates[0],
          lng: data.center.coordinates[1],
        }),
      );
      inst.fitBounds(bounds);
      return (map.current = inst);
    },
    [testingCenters],
  );
  const onUnmount = useCallback(() => (map.current = undefined), []);

  const options = {
    disableDefaultUI: true,
    clickableIcons: false,
    fullScreenControl: false,
    styles: [
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
    ],
  };

  return (
    <GoogleMap
      zoom={10}
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerStyle={{
        width: '100vw',
        height: '100vh',
        maxHeight: '375px',
      }}
      options={options}
    >
      {testingCenters.map((data: any, index: number) => {
        return (
          <Marker
            key={index}
            position={{
              lat: data.center.coordinates[0],
              lng: data.center.coordinates[1],
            }}
            icon={
              index === idx
                ? { url: '/svgs/marker-focused.svg' }
                : { url: '/svgs/marker.svg' }
            }
            onClick={() => {
              onMarkerClick(index);
              getNewBounds();
            }}
          />
        );
      })}
    </GoogleMap>
  );
};

export default Map;
