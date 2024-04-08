import React from 'react';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { faTowerCell, faFileZipper, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeroBanner from '@site/src/components/HeroBanner';
import HeroBackground from '@site/static/img/site/split-background.jpg';
import PaperSpigotIcon from '@site/static/img/icons/paper.png';
import VelocityIcon from '@site/static/img/icons/velocity.png';
import WaterfallBungeeCordIcon from '@site/static/img/icons/waterfall.svg';
import FabricIcon from '@site/static/img/icons/fabric.png';
import NeoForgeIcon from '@site/static/img/icons/neoforge.png';
import ViaProxyIcon from '@site/static/img/icons/viaproxy.png';
import StandaloneIcon from '@site/static/img/icons/geyser.png';
import PlatformIcon from '@site/src/components/PlatformIcon';
import { ProjectDownload } from '@site/src/components/ProjectDownload';
import { Collapsibles, Collapsible } from '@site/src/components/Collapsibles';
import Layout from '@theme/Layout';
import Translate from '@docusaurus/Translate';

const DownloadPage: React.FC = () => (
    <>
        <HeroBanner
            title={<Translate id='pages.download.title'>Download</Translate>}
            subheading={<Translate id='pages.download.subheading'>Download the latest versions of our various projects.</Translate>}
            backgroundImage={HeroBackground}
        />

        <Tabs queryString="project">
            <TabItem value="geyser" label="Geyser" default>
                <ProjectDownload
                    projectId="geyser"
                    description={<Translate id='pages.download.description.geyser'>A bridge/proxy allowing you to connect to Minecraft: Java Edition servers with Minecraft: Bedrock Edition.</Translate>}
                    setup="/geyser/setup"
                    downloadsInfo={{
                        bungeecord: <PlatformIcon svg={WaterfallBungeeCordIcon} text="BungeeCord" />,
                        fabric: <PlatformIcon img={FabricIcon} text="Fabric" />,
                        neoforge: <PlatformIcon img={NeoForgeIcon} text="NeoForge" />,
                        spigot: <PlatformIcon img={PaperSpigotIcon} text="Spigot/Paper" />,
                        standalone: <PlatformIcon img={StandaloneIcon} text="Standalone" />,
                        velocity: <PlatformIcon img={VelocityIcon} text="Velocity" />,
                        viaproxy: <PlatformIcon img={ViaProxyIcon} text="ViaProxy" />,
                    }}
                />
            </TabItem>
            <TabItem value="floodgate" label="Floodgate">
                <ProjectDownload
                    projectId="floodgate"
                    description={<Translate id='pages.download.description.floodgate'>Hybrid mode plugin to allow for connections from Geyser to join online mode servers.</Translate>}
                    setup="/floodgate/setup"
                    downloadsInfo={{
                        bungee: <PlatformIcon svg={WaterfallBungeeCordIcon} text="BungeeCord" />,
                        spigot: <PlatformIcon img={PaperSpigotIcon} text="Spigot/Paper" />,
                        velocity: <PlatformIcon img={VelocityIcon} text="Velocity" />,
                    }}
                />
            </TabItem>
            <TabItem value="other-projects" label="Other Projects">
                <Collapsibles>
                    <Collapsible
                        title='GeyserConnect'
                        subtitle={<Translate id='pages.download.description.geyserconnect'>A plugin to allow for Geyser players to connect to your server without needing to use a proxy.</Translate>}
                        inner={
                            <ProjectDownload
                                projectId="geyserconnect"
                                setup='/other/geyserconnect'
                                downloadsInfo={{
                                    geyserconnect: <><FontAwesomeIcon icon={faTowerCell} /> GeyserConnect</>,
                                }}
                                gridColumns={1}
                            />
                        }
                    />
                    <Collapsible
                        title='GeyserOptionalPack'
                        subtitle={<Translate id='pages.download.description.geyseroptionalpack'>An optional Bedrock resource pack to extend Geyser functionality.</Translate>}
                        inner={
                            <ProjectDownload
                                projectId="geyseroptionalpack"
                                setup='/other/geyseroptionalpack'
                                downloadsInfo={{
                                    geyseroptionalpack: <><FontAwesomeIcon icon={faFileZipper} /> GeyserOptionalPack</>,
                                }}
                                gridColumns={1}
                            />
                        }
                    />
                    <Collapsible
                        title='Hydraulic'
                        subtitle={<Translate id='pages.download.description.hydraulic'>A companion mod to Geyser which allows for Bedrock players to join modded Minecraft: Java Edition servers.</Translate>}
                        inner={
                            <ProjectDownload
                                projectId="hydraulic"
                                setup='/other/hydraulic'
                                downloadsInfo={{
                                    hydraulic: <><FontAwesomeIcon icon={faGear} /> Hydraulic</>,
                                }}
                                gridColumns={1}
                            />
                        }
                    />
                </Collapsibles>
            </TabItem>
        </Tabs>
    </>
);

export default function Download(): JSX.Element {
    return (
        <Layout
            title={`Download`}
            description="Download the latest versions of our various projects."
        >
            <main>
                <div className="container container--fluid margin-vert--lg">
                    <DownloadPage />
                </div>
            </main>
        </Layout>
    )
}

