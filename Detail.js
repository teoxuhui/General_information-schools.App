import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

const Detail = ({ route, navigation }) => {
    const { school } = route.params;
    const [mySound, setMySound] = useState();

    // Function to play sound
    const playSound = async () => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('./assets/nep.mp3') // Ensure nep.mp3 is inside the assets folder
            );
            setMySound(sound);
            await sound.playAsync();
        } catch (error) {
            console.error("Error loading sound:", error);
        }
    };

    // Handle back button press with sound
    const handleBackPress = async () => {
        await playSound(); // Play the sound
        setTimeout(() => {
            navigation.goBack(); // Navigate back after playing
        }, 1000); // Delay navigation slightly to allow sound to play
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>School Details</Text>

            <View style={styles.card}>
                <DetailRow label="Name" value={school.school_name} />
                <DetailRow label="Address" value={school.address} />
                <DetailRow label="Email" value={school.email_address} />
                <DetailRow label="MRT" value={school.mrt_desc} />
                <DetailRow label="Bus" value={school.bus_desc} />
                <DetailRow label="DGP Code" value={school.dgp_code} />
                <DetailRow label="Zone Code" value={school.zone_code} />
                <DetailRow label="Main Level" value={school.mainlevel_code} />
            </View>

            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.backButtonText}>← Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

// Reusable Component for each detail row
const DetailRow = ({ label, value }) => (
    <View style={styles.detailRow}>
        <Text style={styles.label}>{label}:</Text>
        <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "turquoise",
        alignItems: "center",
    },
    heading: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        color: "white",
    },
    card: {
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "white",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    value: {
        fontSize: 16,
        color: "white",
    },
    backButton: {
        marginTop: 20,
        backgroundColor: "gray",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    backButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Detail;
