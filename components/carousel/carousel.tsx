import React from 'react';
import { View, Animated } from 'react-native';
import { styles } from './styles';
import { PanGestureHandler, PanGestureHandlerStateChangeEvent, State } from 'react-native-gesture-handler';
import { AnimatedValue } from 'react-navigation';

interface Props {
    urls: string[];
}

export class CarouselComponent extends React.Component<Props> {
    point: AnimatedValue[] = [];
    keyCount = 0;

    state = {
        selected: 0,
        images: this.props.urls
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderImages()}
                {this.renderSliders()}
            </View>
        )
    }

    renderSliders() {
        if (this.state.images.length > 1) {
            return (
                <View style={styles.sliderContainer}>
                    {
                        this.state.images.map((_, index) => {
                            return (
                                <View key={index} style={[styles.slider, index === this.state.selected ? styles.selected : styles.notSelected]}></View>
                            );
                        })
                    }
                </View>
            );
        }
    }

    _onPanGestureEvent = (index: number) =>
        Animated.event(
            [
                {
                    nativeEvent: {
                        translationX: this.point[index].x
                    },
                },
            ],
            { useNativeDriver: false }
        );

    onHandlerStateChange(
        { nativeEvent }: PanGestureHandlerStateChangeEvent,
        index: number
    ) {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.translationX < -60) {
                this.slideLeft(index);
            } else if (nativeEvent.translationX > 60) {
                this.slideRight(index);
            } else {
                this.resetAnimation(index);
            }
        }
    }

    slideLeft(index: number) {
        Animated.spring(this.point[index], {
            toValue: { x: -1000, y: 0 },
            speed: 1
        }).start();
        setTimeout(() => {
            this.setState({
                images: this.state.images.slice(1, this.state.images.length).concat(this.state.images[0]),
                selected: this.state.selected === this.state.images.length - 1 ? 0 : this.state.selected + 1
            })
        }, 50);
    }

    slideRight(index: number) {
        Animated.spring(this.point[index], {
            toValue: { x: 1000, y: 0 },
            speed: 1
        }).start();
        setTimeout(() => {
            this.setState({
                images: this.state.images.slice(1, this.state.images.length).concat(this.state.images[0]),
                selected: this.state.selected === 0 ? this.state.images.length - 1 : this.state.selected - 1
            })
        }, 50);
    }

    resetAnimation(index: number) {
        Animated.spring(this.point[index], {
            toValue: { x: 0, y: 0 },
            speed: 200
        }).start();
    }

    renderImages() {
        this.keyCount += 1;
        return this.state.images.map((url, index) => {
            this.point[index] = new Animated.ValueXY();
            return (
                <PanGestureHandler
                    enabled={this.state.images.length > 1}
                    onGestureEvent={this._onPanGestureEvent(index)}
                    onHandlerStateChange={({ nativeEvent }) =>
                        this.onHandlerStateChange({ nativeEvent }, index)
                    }
                    key={`${index}_${this.keyCount}`}
                >   
                    <Animated.Image
                        key={`${index}_${this.keyCount}`}
                        style={[styles.image,
                        {
                            zIndex: this.props.urls.length - index
                        },
                        {
                            transform: [
                                { translateX: this.point[index].x },
                            ],
                        }
                        ]}
                        source={{
                            uri: url,
                        }}>
                    </Animated.Image>
                </PanGestureHandler>
            );
        });
    }
}