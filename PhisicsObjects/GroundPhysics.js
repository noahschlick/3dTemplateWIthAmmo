import * as CANNON from 'cannon-es';

export class GroundPhysics {
    constructor(vecShape){
        this.vecShape = vecShape;
        
        const groundPhysMat = new CANNON.Material()
        const groundBody = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(this.vecShape.x, this.vecShape.y, this.vecShape.z)),
            //mass: 0
            type: CANNON.Body.STATIC,
            material: groundPhysMat
        })

        this.groundPhysMat = groundPhysMat
        this.groundBody = groundBody
    }

    getBody() {
        return this.groundBody;
    }

    getPosition() {
        return this.groundBody.position;
    }

    getQuaternion() {
        return this.groundBody.quaternion;
    }

    getPhysMat() {
        return this.groundPhysMat;
    }

    setQuaternionFromEuler(x, y, z) {
        this.groundBody.quaternion.setFromEuler(x, y, z)
    }

}