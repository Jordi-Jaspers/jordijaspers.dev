<script lang="ts">
    import {
        ApacheGroovyLogo,
        BitwardenLogo,
        BunLogo,
        DockerLogo,
        DuckduckLogo,
        GnuBashLogo,
        GoogleLogo,
        GradleLogo,
        JenkinsLogo,
        JiraLogo,
        KeycloakLogo,
        KibanaLogo,
        KotlinLogo,
        KubernetesLogo,
        LinuxLogo,
        LiquibaseLogo,
        NextDnsLogo,
        NextjsLogo,
        NpmLogo,
        OracleLogo,
        PortainerLogo,
        PostgresLogo,
        PostmanLogo,
        SpringLogo,
        SvelteLogo,
        TailscaleLogo,
        TailwindCssLogo,
        TraefikLogo
    } from '$lib/components/stack/index.ts';
    import {type Writable, writable} from "svelte/store";

    let isHovering1: Writable<boolean> = writable(false);
    let isHovering2: Writable<boolean> = writable(false);
    let techStack = [
        {name: "Apache Groovy", logo: ApacheGroovyLogo},
        {name: "Bitwarden", logo: BitwardenLogo},
        {name: "Bun", logo: BunLogo},
        {name: "Docker", logo: DockerLogo},
        {name: "Duckduck", logo: DuckduckLogo},
        {name: "GNU Bash", logo: GnuBashLogo},
        {name: "Google", logo: GoogleLogo},
        {name: "Gradle", logo: GradleLogo},
        {name: "Jenkins", logo: JenkinsLogo},
        {name: "Jira", logo: JiraLogo},
        {name: "Keycloak", logo: KeycloakLogo},
        {name: "Kibana", logo: KibanaLogo},
        {name: "Kotlin", logo: KotlinLogo},
        {name: "Kubernetes", logo: KubernetesLogo},
        {name: "Linux", logo: LinuxLogo},
        {name: "Liquibase", logo: LiquibaseLogo},
        {name: "Next DNS", logo: NextDnsLogo},
        {name: "Next.js", logo: NextjsLogo},
        {name: "Npm", logo: NpmLogo},
        {name: "Oracle", logo: OracleLogo},
        {name: "Portainer", logo: PortainerLogo},
        {name: "Postgres", logo: PostgresLogo},
        {name: "Postman", logo: PostmanLogo},
        {name: "Spring", logo: SpringLogo},
        {name: "Svelte", logo: SvelteLogo},
        {name: "Tailscale", logo: TailscaleLogo},
        {name: "Tailwind CSS", logo: TailwindCssLogo},
        {name: "Traefik", logo: TraefikLogo}
    ];
</script>

<div class="flex justify-between w-full h-full overflow-y-scroll space-x-8">
    <div class="absolute left-0 top-5 h-[50%] w-full inline-flex flex-nowrap items-center" on:pointerover={() => isHovering1.set(true)} on:pointerout={() => isHovering1.set(false)}>
        <ul class="flex items-center space-x-8 h-28 infinite-x-scroll {$isHovering1 && 'pause'}">
            {#each techStack as {name, logo}}
                <li class="flex flex-col justify-end space-y-4 h-full">
                    <svelte:component this={logo} class="dark:fill-white fill-muted-foreground/75"/>
                    <p class="font-montserrat text-xs font-semibold text-muted-foreground/75 text-nowrap">{name}</p>
                </li>
            {/each}
        </ul>
        <ul class="flex items-center space-x-8 h-28 infinite-x-scroll {$isHovering1 && 'pause'}">
            {#each techStack as {name, logo}}
                <li class="flex flex-col justify-end space-y-4 h-full">
                    <svelte:component this={logo} class="dark:fill-white fill-muted-foreground/75"/>
                    <p class="font-montserrat text-xs font-semibold text-muted-foreground/75 text-nowrap">{name}</p>
                </li>
            {/each}
        </ul>
    </div>
    <div class="absolute left-0 bottom-5 h-[50%] w-full inline-flex flex-nowrap items-center space-x-8" on:pointerover={() => isHovering2.set(true)} on:pointerout={() => isHovering2.set(false)}>
        <ul class="flex items-center space-x-8 h-28 infinite-x-scroll-reverse {$isHovering2 && 'pause'}">
            {#each techStack as {name, logo}}
                <li class="flex flex-col justify-end space-y-4 h-full">
                    <svelte:component this={logo} class="dark:fill-white fill-muted-foreground/75"/>
                    <p class="font-montserrat text-xs font-semibold text-muted-foreground/75 text-nowrap">{name}</p>
                </li>
            {/each}
        </ul>
        <ul class="flex items-center space-x-8 h-28 infinite-x-scroll-reverse {$isHovering2 && 'pause'}">
            {#each techStack as {name, logo}}
                <li class="flex flex-col justify-end space-y-4 h-full">
                    <svelte:component this={logo} class="dark:fill-white fill-muted-foreground/75"/>
                    <p class="font-montserrat text-xs font-semibold text-muted-foreground/75 text-nowrap">{name}</p>
                </li>
            {/each}
        </ul>
    </div>
</div>
