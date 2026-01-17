import { CommonButton } from "@components/button";
import { EventSource } from "@models/event";
import { memo } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";


interface TicketButtonProps {
    source: EventSource;
    onPress: (url: string) => void;
}

interface TicketSourceConfig {
    icon: ImageSourcePropType;
    bgColor: string;
}

const TICKET_SOURCE_CONFIG: Record<string, TicketSourceConfig> = {
    skiddle: {
        icon: require("@assets/images/skiddle_icon.png"),
        bgColor: "#a3d1c8",
    },
    ticketmaster: {
        icon: require("@assets/images/ticketmaster_icon.png"),
        bgColor: "#024DDF",
    },
} as const;

export const TicketButton = memo<TicketButtonProps>(({ source, onPress }) => {
    const config = TICKET_SOURCE_CONFIG[source.name];
    
    if (!config || !source.deepLinkUrl) {
        return null;
    }

    return (
        <CommonButton
            backgroundColor={config.bgColor}
            textColour="#fff"
            vectorIcon={
                <Image
                    source={config.icon}
                    style={styles.ticketIcon}
                />
            }
            onPress={() => onPress(source.deepLinkUrl!)}
        />
    );
});

const styles = StyleSheet.create({
        ticketIcon: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
});