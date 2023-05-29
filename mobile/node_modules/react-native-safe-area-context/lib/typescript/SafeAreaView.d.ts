import * as React from 'react';
import type { NativeSafeAreaViewProps } from './SafeArea.types';
import NativeSafeAreaView from './specs/NativeSafeAreaView';
declare type NativeSafeAreaViewInstance = InstanceType<typeof NativeSafeAreaView>;
export declare type SafeAreaViewProps = NativeSafeAreaViewProps;
export declare const SafeAreaView: React.ForwardRefExoticComponent<SafeAreaViewProps & React.RefAttributes<NativeSafeAreaViewInstance>>;
export {};
