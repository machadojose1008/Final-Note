import React from "react";
import { Document, Page, Text, StyleSheet, Image, View } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    content: {
        flex: 1,
        padding: 10,
    },
    text: {
        fontSize: 12,
    },
    image: {
        marginBottom:10,
        width:'100%',
        height:'auto',
    },
});

const PdfDocument = ({ content }) => {
    const imgRegex = /<img.*?src="(.*?)"/g;
    const matches = content.matchAll(imgRegex);
    const images = Array.from(matches).map((match) => match[1]);

    return (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.content}>
                    {images.map((src, index) => (
                        <Image key={index} src={src} style={styles.image} />
                    ))}
                </View>
                <Text style={styles.text}>{content.replace(imgRegex, '')}</Text>
            </Page>
        </Document>
    );



};

export default PdfDocument;